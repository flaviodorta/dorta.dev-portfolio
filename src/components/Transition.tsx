import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  firstAccessAtom,
  isMenuOpenAtom,
  routerAtom,
  shouldTransitionAtom,
} from '../recoil/atoms'
import Intro from '../pages/Intro'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import { useRef } from 'react'
import { Power1, gsap } from 'gsap'
import { NavigateFunction, useNavigate } from 'react-router-dom'

const Transition = ({ cb }: { cb?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null!)
  const tl = useRef<GSAPTimeline>()
  const ctx = useRef<ReturnType<typeof gsap.context>>()

  const [route, setRoute] = useRecoilState(routerAtom)

  const setShouldTransition = useSetRecoilState(shouldTransitionAtom)
  const setIsMenuOpen = useSetRecoilState(isMenuOpenAtom)

  const navigate = useNavigate()

  useIsomorphicLayoutEffect(() => {
    ctx.current = gsap.context(() => {
      tl.current = gsap.timeline()

      tl.current
        .to('.block', {
          width: '5.1%',
          stagger: {
            amount: 0.9,
          },
          ease: Power1.easeInOut,
        })
        .to('.block', {
          transformOrigin: 'left',
        })
        .call(() => {
          navigate(route)
          setIsMenuOpen(false)
          cb && cb()
          console.log('first part')
        })
        .to(
          '.block',
          {
            width: '0%',
            stagger: {
              amount: -0.9,
            },
            ease: Power1.easeInOut,
          },
          '+=.79'
        )
        .call(() => {
          setShouldTransition(false)
          console.log('second part')
        })
    }, ref)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed w-screen h-screen z-[3000] -ml-[var(--layout-padding-xsm)] lg:-ml-[var(--layout-padding-lg)] -mt-[var(--layout-padding-xsm)] lg:-mt-[var(--layout-padding-lg)]"
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
