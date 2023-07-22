import { useSetRecoilState } from 'recoil'
import { cursorVariantAtom } from '../../recoil/atoms'
import { Typewriter } from '../../components/Typewriter/Typewriter'
import { Variants, motion } from 'framer-motion'
import { useTimeout } from 'usehooks-ts'
import React from 'react'

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
    'e-commerces, web systems, landing pages, blogs & more',
    'front-end & back-end development',
    'UX & UI best pratices',
  ]

  const setCursorVariant = useSetRecoilState(cursorVariantAtom)

  const f = 'creative developer'.split('')

  const [x, y] = React.useState(false)

  useTimeout(() => y(true), 2000)

  return (
    <main className="relative overflow-hidden mx-auto px-[1rem] font-anton md:-translate-y-16 md:-translate-x-16  2xl:-translate-y-24 2xl:-translate-x-24">
      <h1
        onMouseEnter={() => setCursorVariant('variant-1')}
        onMouseLeave={() => setCursorVariant('default')}
        className="overflow-hidden text-4xl md:text-7xl mb-4"
      >
        {x &&
          f.map((l, i) => (
            <motion.div
              key={i}
              initial={{ y: 140, skewX: -40, skewY: 40 }}
              animate={{
                y: 0,
                skewX: 0,
                skewY: 0,
                transition: {
                  duration: 1,
                  delay: 0.08 * i,
                  type: 'tween',
                },
              }}
              viewport={{ once: true }}
              className="inline-block"
            >
              {l === ' ' ? <span>&nbsp;</span> : l}
            </motion.div>
          ))}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="text-primary animate-pulse"
        >
          .
        </motion.span>
      </h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 5 } }}
      >
        <Typewriter
          texts={strings}
          initialDelay={5500}
          onMouseEnter={() => setCursorVariant('variant-1')}
          onMouseLeave={() => setCursorVariant('default')}
          className="font-share-tech w-full z-10 text-white h-fit md:text-2xl"
        />
      </motion.div>
    </main>
  )
}

export default Hero
