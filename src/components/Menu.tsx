import { AnimatePresence, motion as m } from 'framer-motion'
import { useSoundsContext } from '../context/SoundsContext'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  isMenuOpenAtom,
  routerAtom,
  shouldTransitionAtom,
} from '../recoil/atoms'
import {
  firstMenuBackgroundVariants,
  secondMenuBackgroundVariants,
} from '../helpers/variants'
import React, { useEffect } from 'react'

type OptionProps = React.ComponentPropsWithoutRef<'li'> & {
  path: string
}

const Option = (props: OptionProps) => {
  const setRoute = useSetRecoilState(routerAtom)
  const setShouldTransition = useSetRecoilState(shouldTransitionAtom)

  return (
    <div className="group relative w-fit h-fit">
      <div
        onClick={() => {
          setShouldTransition(true)
          setRoute(props.path)
        }}
        className="cursor-pointer p-2 transition-colors duration-150 ease-out group-hover:bg-primary font-anton text-7xl  uppercase"
      >
        {props.children}
      </div>
    </div>
  )
}

const Menu = () => {
  const { onAnimationExitTransitionSound } = useSoundsContext()
  const isMenuOpen = useRecoilValue(isMenuOpenAtom)
  const links = ['home', 'about', 'works', 'services', 'contact']

  const shouldTransition = useRecoilValue(shouldTransitionAtom)

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          <m.div
            variants={firstMenuBackgroundVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onAnimationStart={() => {
              if (!shouldTransition) onAnimationExitTransitionSound!()
            }}
            onAnimationEnd={() => {
              if (!shouldTransition) onAnimationExitTransitionSound!()
            }}
            className="z-[1000] h-[100vh] opacity-100 absolute bg-black w-full"
          >
            <div className="h-full w-full absolute">
              <ul className="h-full w-full flex flex-col gap-0 items-center justify-center">
                {links.map((link, idx) => (
                  <Option key={idx} path={link}>
                    {link}
                  </Option>
                ))}
              </ul>
            </div>
          </m.div>
          <m.div
            variants={secondMenuBackgroundVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="z-[999] h-[100vh] bg-primary absolute w-full left-0"
          />
        </>
      )}
    </AnimatePresence>
  )
}

export default Menu
