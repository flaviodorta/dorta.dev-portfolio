import React, { useRef, useState } from 'react'
import { isDesktop, isMobile } from 'react-device-detect'
import gsap from 'gsap'
import { useEventListener } from 'usehooks-ts'
import { twMerge } from 'tailwind-merge'
import { cursorStyleVariants, cursorVariants } from '../helpers/variants'
import { motion } from 'framer-motion'
import { useRecoilState, useRecoilValue } from 'recoil'
import { cursorVariantAtom } from '../recoil/atoms'

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

    // gsap.to(ref.current, {
    //   width: cursorVariant ? 54 : 16,
    //   height: cursorVariant ? 54 : 16,
    //   duration: 0.25,
    //   ease: 'power.out(1.1, .44)',
    // })
  }

  useEventListener('mousemove', mouseFollower)

  useEventListener('scroll', mouseFollower)

  return (
    <div
      ref={divRef}
      className={twMerge([
        'relative w-screen z-50 h-screen min-h-screen overflow-x-hidden text-white bg-black',
      ])}
    >
      {isDesktop && (
        <div
          ref={ref}
          className={twMerge([
            'transition-[width,height] duration-[125] pointer-events-none w-4 h-4 bg-none z-[1000] left-0 top-0 border-[1px] border-white rounded-[50px] absolute -translate-x-1/2 -translate-y-1/2 rotate-0',
            cursorVariant === 'variant-1'
              ? 'transition-[width,height] duration-[125] w-11 h-11 border-dashed'
              : '',
          ])}
        />
      )}

      {children}
    </div>
  )
}

export default Layout
