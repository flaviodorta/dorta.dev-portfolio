import { useState } from 'react'
import HamburgerMenu from './HamburgerMenu'
import Logo from './Logo'
import { useToggle } from 'usehooks-ts'

const Navbar = () => {
  return (
    <>
      <div className="fixed left-[4vw] top-[2rem] md:left-[30px] md:top-[3rem] z-[4000]">
        <Logo />
      </div>
      <div className="fixed right-[4vw] top-[1.5rem] md:right-[40px] md:top-[2.5rem] z-[4000]">
        <HamburgerMenu />
      </div>
    </>
  )
}

export default Navbar
