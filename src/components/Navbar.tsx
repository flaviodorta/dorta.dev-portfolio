import { useState } from 'react'
import HamburgerMenu from './HamburgerMenu'
import Logo from './Logo'
import { useToggle } from 'usehooks-ts'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useToggle(false)
  return (
    <div className="flex justify-between items-center">
      <Logo />
      <HamburgerMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </div>
  )
}

export default Navbar
