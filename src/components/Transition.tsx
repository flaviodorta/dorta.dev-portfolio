import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  firstAccessAtom,
  isMenuOpenAtom,
  routerAtom,
  shouldTransitionAtom,
  soundAtom,
} from '../recoil/atoms'
import Intro from '../pages/Intro'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import React, { useRef } from 'react'
import { Power1, gsap } from 'gsap'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Howl } from 'howler'
import { delay } from 'lodash'

interface TransitionProps {
  onMount?: () => void
  onUnmount?: () => void
}

const Transition: React.FC<TransitionProps> = ({ onMount, onUnmount }) => {
  const ref = useRef<HTMLDivElement>(null!)
  const tl = useRef<GSAPTimeline>()
  const ctx = useRef<ReturnType<typeof gsap.context>>()

  const [route,] = useRecoilState(routerAtom)

  const setShouldTransition = useSetRecoilState(shouldTransitionAtom)
  const setIsMenuOpen = useSetRecoilState(isMenuOpenAtom)

  const navigate = useNavigate()

  const isSoundOn = useRecoilValue(soundAtom)

  const transitionSound = new Howl({
    src: ['/sounds/page-transition.wav'],
    mute: !isSoundOn,
    preload: 'metadata'
  })

  const isFirstAccess = useRecoilValue(firstAccessAtom)

  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      tl.current = gsap.timeline()

      tl.current
        .call(() => {
          if (!isFirstAccess) setTimeout(() => transitionSound.play(), 50)
        })
        .to('.block', {
          width: '5.1%',
          stagger: {
            amount: 0.7,
          },
          ease: Power1.easeInOut,
        })
        .to('.block', {
          transformOrigin: 'left',
        })
        .call(() => {
          navigate(route)
          setIsMenuOpen(false)
          onMount && onMount()
          if (!isFirstAccess) setTimeout(() => transitionSound.play(), 400)
        })
        .to(
          '.block',
          {
            width: '0%',
            stagger: {
              amount: -0.7,
            },
            ease: Power1.easeInOut,
          },
          '+=.46'
        )
        .call(() => {
          setShouldTransition(false)
        })
    }, ref)

    return () => {
      ctx.current?.revert()
      onUnmount && onUnmount()
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed w-screen h-screen z-[7000] -ml-[var(--layout-padding-xsm)] lg:-ml-[var(--layout-padding-lg)] -mt-[var(--layout-padding-xsm)] lg:-mt-[var(--layout-padding-lg)]"
    >
      <div className="block block-1" />
      <div className="block block-2" />
      <div className="block block-3" />
      <div className="block block-4" />
      <div className="block block-5" />
      <div className="block block-6" />
      <div className="block block-7" />
      <div className="block block-8" />
      <div className="block block-9" />
      <div className="block block-10" />
      <div className="block block-11" />
      <div className="block block-12" />
      <div className="block block-13" />
      <div className="block block-14" />
      <div className="block block-15" />
      <div className="block block-16" />
      <div className="block block-17" />
      <div className="block block-18" />
      <div className="block block-19" />
      <div className="block block-20" />
    </div>
  )
}

export default Transition
