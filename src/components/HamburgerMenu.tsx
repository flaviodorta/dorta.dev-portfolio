import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useHover } from 'usehooks-ts'
import { useSoundsContext } from '../context/SoundsContext'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { cursorVariantAtom, isMenuOpenAtom } from '../recoil/atoms'

const HamburgerMenu = () => {
  const menuIconRef = useRef<HTMLDivElement>(null)
  const setCursorVariant = useSetRecoilState(cursorVariantAtom)
  const isMenuIconHover = useHover(menuIconRef)
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(isMenuOpenAtom)

  const {
    openMenuSoundPlay,
    hoverCloseMenuIconSoundPlay,
    hoverOpenMenuIconSoundPlay,
  } = useSoundsContext()

  const menuSounds = () => {
    if (isMenuOpen) {
      hoverCloseMenuIconSoundPlay!()
    } else {
      hoverOpenMenuIconSoundPlay!()
    }
  }

  const onClickMenuIcon = () => {
    setIsMenuOpen(!isMenuOpen)
    openMenuSoundPlay!()
    console.log(isMenuOpen)
  }

  const onMouseEnterMenuIcon = () => {
    menuSounds()
    setCursorVariant('variant-1')
  }

  const onMouseLeaveMenuIcon = () => setCursorVariant('default')

  return (
    <div
      ref={menuIconRef}
      className="z-[2000] relative cursor-pointer group group-hover:bg-transparent flex items-center justify-end w-[70px] h-[70px]"
      onClick={onClickMenuIcon}
      onMouseEnter={onMouseEnterMenuIcon}
      onMouseLeave={onMouseLeaveMenuIcon}
    >
      <div className="relative">
        <span
          className={twMerge([
            'absolute -translate-x-full left-0 h-[4px] ease-in-out',
            isMenuIconHover ? 'bg-primary' : 'bg-white',
            isMenuOpen
              ? 'rotate-45 w-[30px] md:w-[35px] bottom-0 duration-500'
              : 'w-[30px] md:w-[45px] bottom-[2.5px] duration-[200ms]',
          ])}
        />
        <span
          className={twMerge([
            'absolute -translate-x-full left-0  h-[4px] ease-in-out duration-[400ms]',
            isMenuIconHover ? 'bg-primary' : 'bg-white',
            isMenuOpen
              ? '-rotate-45 w-[30px] md:w-[35px] bottom-0'
              : 'w-[20px] md:w-[30px] -bottom-[7.5px]',
          ])}
        />
      </div>
    </div>
  )
}

export default HamburgerMenu
