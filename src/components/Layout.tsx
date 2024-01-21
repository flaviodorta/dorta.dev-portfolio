import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { isDesktop } from 'react-device-detect'
import gsap from 'gsap'
import { useEventListener, useTimeout } from 'usehooks-ts'
import { twMerge } from 'tailwind-merge'
import {
  cursorVariantAtom,
  firstAccessAtom,
  isLoadingAtom,
  routerAtom,
  shouldTransitionAtom,
  soundAtom,
  transitionFinishedAtom,
} from '../recoil/atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import Intro from '../pages/Intro'
import Transition from './Transition'
import Menu from './Menu'
import { useSoundsContext } from '../context/SoundsContext'
import Navbar from './Navbar'
import { Footer } from './Footer'
import { motion } from 'framer-motion'

const Layout = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null!)
  const divRef = useRef<HTMLDivElement>(null!)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cursorVariant = useRecoilValue(cursorVariantAtom)

  const r = useRef<HTMLDivElement>(null!)

  const [scrollY, setScrollY] = useState(
    document.getElementById('root')?.scrollTop || 0
  )

  useEventListener('scroll', () => {
    setScrollY(document.getElementById('root')?.scrollTop || 0)
  })

  const mouseFollower = (e: MouseEvent | Event) => {
    setScrollY(document.getElementById('root')?.scrollTop || 0)

    setMousePosition({
      x: (e as MouseEvent).clientX,
      y: (e as MouseEvent).clientY + scrollY,
    })

    gsap.to(ref.current, {
      duration: 1.6,
      x: mousePosition.x,
      y: mousePosition.y,
      ease: 'elastic.out(1.1, .44)',
    })

    gsap.to(ref.current, {
      rotation: cursorVariant !== 'default' ? 360 : 0,
      repeat: -1,
      duration: 2,
      ease: 'linear',
    })
  }

  useEventListener('mousemove', mouseFollower)

  useEventListener('scroll', mouseFollower)

  const [isFirstAccess, setIsFirstAccess] = useRecoilState(firstAccessAtom)

  const [shouldTransition, setShouldTransition] =
    useRecoilState(shouldTransitionAtom)

  const [, setTransitionFinished] = useRecoilState(transitionFinishedAtom)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isFirstAccess) {
      timer = setTimeout(() => {
        setShouldTransition(true)
      }, 9000)
    }

    return () => clearTimeout(timer)
  }, [])

  const { backgroundSoundRef } = useSoundsContext()

  const isSoundOn = useRecoilValue(soundAtom)

  const [soundId, setSoundId] = useState(0)

  useEffect(() => {
    if (isSoundOn) {
      if (soundId) {
        backgroundSoundRef!.current.play(soundId)
      } else {
        const id = backgroundSoundRef!.current.play()
        setSoundId(id)
      }
    } else backgroundSoundRef!.current.pause(soundId)
  }, [isSoundOn])

  const route = useRecoilValue(routerAtom)

  const [x, y] = useState(0)

  useEffect(() => y((s) => s + 1), [route])

  // const isFirstAccess = useRecoilValue(firstAccessAtom)
  const transitionFinished = useRecoilValue(transitionFinishedAtom)
  const [shouldAnimateNavIcons, setShouldAnimateNavIcons] = useState(() => {
    if (isFirstAccess) return true
    else return false
  })

  useEffect(() => {
    if (!isFirstAccess && shouldAnimateNavIcons === true)
      setShouldAnimateNavIcons(false)
  }, [transitionFinished])

  return (
    <div
      ref={divRef}
      className={twMerge([
        'relative w-screen z-50 h-screen min-h-screen text-white bg-black',
        route !== '/about' && 'overflow-hidden',
      ])}
    >
      {isDesktop && (
        <div
          ref={ref}
          className={twMerge([
            'absolute transition-[width,height] duration-[125] pointer-events-none w-4 h-4 bg-none z-[3000] left-0 top-0 border-[1px] border-white rounded-[50px] -translate-x-1/2 -translate-y-1/2 rotate-0',
            cursorVariant === 'variant-1'
              ? 'transition-[width,height] duration-[125] w-11 h-11 border-dashed'
              : '',
          ])}
        />
      )}

      <Menu />

      {shouldTransition && (
        <Transition
          onMount={() => setIsFirstAccess(false)}
          onUnmount={() => setTransitionFinished(true)}
        />
      )}

      {isFirstAccess && <Intro />}

      <div
        ref={r}
        className="absolute flex justify-between items-center top-0 left-0 w-full h-full"
      >
        <Navbar shouldAnimate={shouldAnimateNavIcons} />
        {children}
        <Footer shouldAnimate={shouldAnimateNavIcons} />
      </div>
    </div>
  )
}

export default Layout
