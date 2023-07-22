import Navbar from '../../components/Navbar'
import SpaceBackground from '../../components/canvas/Space'
import { Footer } from '../../components/Footer'
import Hero from './Hero'
import { lazy, Suspense, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useTimeout } from 'usehooks-ts'

const Home = () => {
  const SpaceBackground = useMemo(
    () => lazy(() => import('../../components/canvas/Space')),
    []
  )

  const [k, l] = useState(false)

  useTimeout(() => l(true), 7500)

  return (
    <>
      {/* <Suspense fallback={null}>
        <motion.div
          className="h-full"
          animate={k ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 3 }}
        >
          <SpaceBackground />
        </motion.div>
      </Suspense> */}
      <Hero />
    </>
  )
}

export default Home
