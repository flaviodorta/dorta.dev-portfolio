import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  cursorVariantAtom,
  firstAccessAtom,
  transitionFinishedAtom,
} from '../../recoil/atoms'
import { Typewriter } from '../../components/Typewriter/Typewriter'
import { Variants, motion } from 'framer-motion'
import { useTimeout } from 'usehooks-ts'
import React, { useState } from 'react'
import { StarsCanvas } from '../../components/StarCanvas'

const container: Variants = {
  hidden: { transition: { delay: 3 } },
  show: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
}

const item: Variants = {
  hidden: { y: 140, skewY: 40 },
  show: {
    y: 0,
    skewY: 0,
    transition: {
      ease: 'easeOut',
    },
  },
}

const Hero = () => {
  const strings = [
    'modern & innovative digital solutions',
    'e-commerces, web systems, landing pages & more',
    'front-end & back-end development',
    'UX & UI best pratices',
  ]

  const setCursorVariant = useSetRecoilState(cursorVariantAtom)

  const f = 'creative developer'.split('')

  const [x, y] = React.useState(false)

  useTimeout(() => y(true), 2000)

  const isFirstAccess = useRecoilValue(firstAccessAtom)

  const transitionFinished = useRecoilValue(transitionFinishedAtom)

  const [startTypeWriter, setStartTyperwriter] = useState(110000)

  return (
    <>
      <StarsCanvas />

      <main className="relative w-full flex justify-center overflow-hidden mx-auto px-[1rem] font-anton md:-translate-y-16 md:-translate-x-16  2xl:-translate-y-24 2xl:-translate-x-24">
        <div className="lg:w-[40rem]">
          <h1
            onMouseEnter={() => setCursorVariant('variant-1')}
            onMouseLeave={() => setCursorVariant('default')}
            className="overflow-hidden flex text-4xl md:text-7xl mb-4"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={transitionFinished && { y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="mr-5 uppercase tracking-wide"
            >
              Creative
            </motion.div>

            <motion.div
              initial={{ y: '100%' }}
              animate={transitionFinished && { y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
              onAnimationStart={() => {
                setStartTyperwriter(3800)
                console.log('cuzin')
              }}
              className="uppercase tracking-wide"
            >
              Developer
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={transitionFinished && { opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-primary opacity-0"
            >
              .
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={transitionFinished && { opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <Typewriter
              texts={strings}
              initialDelay={startTypeWriter}
              onMouseEnter={() => setCursorVariant('variant-1')}
              onMouseLeave={() => setCursorVariant('default')}
              className="font-libertad text-sm font-thin w-full z-10 text-white h-fit md:text-xl"
            />
          </motion.div>
        </div>
      </main>
    </>
  )
}

export default Hero
