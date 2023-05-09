import { useState } from 'react'
import HamburgerMenu from './HamburgerMenu'
import Logo from './Logo'
import { useToggle } from 'usehooks-ts'

const Navbar = () => {
  return (
    <div className="flex justify-between items-center">
      <Logo />
      <HamburgerMenu />
    </div>
  )
}

export default Navbar
