import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useHover } from 'usehooks-ts'
import { useSoundsContext } from '../context/SoundsContext'

import { useSetRecoilState } from 'recoil'
import { cursorVariantAtom } from '../recoil/atoms'

const HamburgerMenu = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean
  setIsMenuOpen: () => void
}) => {
  const menuIconRef = useRef<HTMLDivElement>(null)
  const setCursorVariant = useSetRecoilState(cursorVariantAtom)
  const isMenuIconHover = useHover(menuIconRef)

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
    setIsMenuOpen()
    openMenuSoundPlay!()
  }

  const onMouseEnterMenuIcon = () => {
    menuSounds()
    setCursorVariant('variant-1')
  }

  const onMouseLeaveMenuIcon = () => setCursorVariant('default')

  return (
    <div
      ref={menuIconRef}
      className="relative cursor-pointer group group-hover:bg-transparent z-40 flex items-center justify-end w-[70px] h-[70px]"
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
