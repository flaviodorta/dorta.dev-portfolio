import { useRecoilValue } from 'recoil'
import HamburgerMenu from './HamburgerMenu'
import Logo from './Logo'
import { motion } from 'framer-motion'
import { firstAccessAtom, transitionFinishedAtom } from '../recoil/atoms'
import { useEffect, useState } from 'react'

const Navbar = ({ shouldAnimate }: { shouldAnimate: boolean }) => {
  return (
    <>
      <motion.div
        initial={false}
        animate={
          shouldAnimate
            ? { opacity: 0, display: 'none' }
            : { opacity: 1, display: 'block' }
        }
        transition={{ delay: 3.5, duration: 0.6 }}
        className="fixed left-[4vw] top-[2rem] md:left-[30px] md:top-[3rem] z-[4000]"
      >
        <Logo />
      </motion.div>

      <motion.div
        initial={false}
        animate={
          shouldAnimate
            ? { opacity: 0, display: 'none' }
            : { opacity: 1, display: 'block' }
        }
        transition={{ delay: 3, duration: 0.6 }}
        className="fixed right-[4vw] top-[1.5rem] md:right-[40px] md:top-[2.5rem] z-[4000]"
      >
        <HamburgerMenu />
      </motion.div>
    </>
  )
}

export default Navbar
