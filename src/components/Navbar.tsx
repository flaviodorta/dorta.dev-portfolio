import HamburgerMenu from './HamburgerMenu'
import Logo from './Logo'
import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 1 }}
        className="fixed left-[4vw] top-[2rem] md:left-[30px] md:top-[3rem] z-[4000]"
      >
        <Logo />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 1 }}
        className="fixed right-[4vw] top-[1.5rem] md:right-[40px] md:top-[2.5rem] z-[4000]"
      >
        <HamburgerMenu />
      </motion.div>
    </>
  )
}

export default Navbar
