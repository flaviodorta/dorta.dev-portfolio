import React, { useEffect, useRef, useState } from 'react'
import { isDesktop } from 'react-device-detect'
import gsap from 'gsap'
import { useEventListener } from 'usehooks-ts'
import { twMerge } from 'tailwind-merge'
import {
  cursorVariantAtom,
  firstAccessAtom,
  routerAtom,
  shouldTransitionAtom,
  soundAtom,
} from '../recoil/atoms'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import Intro from '../pages/Intro'
import Transition from './Transition'
import { useFetcher, useLocation } from 'react-router-dom'
import Menu from './Menu'
import { useSoundsContext } from '../context/SoundsContext'
import { Howl } from 'howler'

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

  const mouseFollower = (e: MouseEvent | Event) => {
    const scrollY = divRef.current.scrollTop

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

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isFirstAccess) {
      timer = setTimeout(() => {
        setShouldTransition(true)
      }, 2500)
    }

    return () => clearTimeout(timer)
  }, [])

  const setRoute = useSetRecoilState(routerAtom)

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') setRoute('/home')
    else setRoute(location.pathname)
  }, [location])

  const { backgroundSoundRef } = useSoundsContext()

  const isSoundOn = useRecoilValue(soundAtom)

  useEffect(() => {
    if (isSoundOn) {
      backgroundSoundRef!.current.play()
    } else backgroundSoundRef!.current.stop()
  }, [isSoundOn])

  return (
    <div
      ref={divRef}
      className={twMerge([
        'relative w-screen z-50 h-screen min-h-screen overflow-hidden text-white bg-black',
      ])}
    >
      {isDesktop && (
        <div
          ref={ref}
          className={twMerge([
            'transition-[width,height] duration-[125] pointer-events-none w-4 h-4 bg-none z-[3000] left-0 top-0 border-[1px] border-white rounded-[50px] absolute -translate-x-1/2 -translate-y-1/2 rotate-0',
            cursorVariant === 'variant-1'
              ? 'transition-[width,height] duration-[125] w-11 h-11 border-dashed'
              : '',
          ])}
        />
      )}

      <Menu />

      {shouldTransition && <Transition cb={() => setIsFirstAccess(false)} />}

      {isFirstAccess ? <Intro /> : <>{children}</>}
    </div>
  )
}

export default Layout
