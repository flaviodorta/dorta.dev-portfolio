import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import Logo from '../components/Logo'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import Transition from '../components/Transition'
import { useNavigate } from 'react-router-dom'

const Intro = ({ cb }: { cb?: () => void }) => {
  const tl = useRef<GSAPTimeline>()
  const ref = useRef<HTMLDivElement>(null!)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline()

      tl.current.to('.logo', {
        opacity: 1,
        duration: 1,
        delay: 0.5,
      })
    }, ref)

    return () => {
      ctx.revert()
      // cb && cb()
    }
  }, [])

  return (
    <div ref={ref} className="overflow-hidden w-full h-full flex-center">
      <Logo className="logo -translate-y-16 opacity-0" />
    </div>
  )
}

export default Intro
