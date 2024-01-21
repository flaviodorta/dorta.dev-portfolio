import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import Logo from '../components/Logo'
import { gsap } from 'gsap'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Intro = ({ cb }: { cb?: () => void }) => {
  const tl = useRef<GSAPTimeline>()
  const ref = useRef<HTMLDivElement>(null!)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline()

      tl.current.to('.logo', {
        opacity: 1,
        duration: 0.4,
        delay: 0.2,
      })
    }, ref)

    return () => {
      ctx.revert()
    }
  }, [])

  const [loadingBarWidth, setLoadingBarWidth] = useState(0)

  useEffect(() => {
    const timer1 = setTimeout(() => setLoadingBarWidth(20), 2000)
    const timer2 = setTimeout(() => setLoadingBarWidth(60), 3000)
    const timer3 = setTimeout(() => setLoadingBarWidth(100.1), 6500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="overflow-hidden w-full h-full bg-black flex-center flex-col fixed z-[4001]"
    >
      <div className="logo opacity-0 flex flex-col justify-center w-fit -translate-y-16">
        <Logo className="mb-8" />

        <div className="relative w-full">
          <div className="absolute top-0 left-[.5px] h-[4px] w-[99%] bg-white/60 rounded-[1px]" />
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: loadingBarWidth + '%' }}
            className="absolute top-0 h-[4px] bg-primary rounded-[1px]"
          />
        </div>
      </div>
    </div>
  )
}

export default Intro
