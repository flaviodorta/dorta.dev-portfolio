import { AnimatePresence, motion as m } from 'framer-motion'
import { useSoundsContext } from '../context/SoundsContext'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  isMenuOpenAtom,
  routerAtom,
  shouldTransitionAtom,
} from '../recoil/atoms'
import {
  firstMenuBackgroundVariants,
  secondMenuBackgroundVariants,
} from '../helpers/variants'
import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useHover } from 'usehooks-ts'

type OptionProps = React.ComponentPropsWithoutRef<'li'> & {
  path: string
  idx: number
  // text: string;
}

const Option = (props: OptionProps) => {
  const setRoute = useSetRecoilState(routerAtom)
  const [shouldTransition, setShouldTransition] =
    useRecoilState(shouldTransitionAtom)
  const ref = useRef<HTMLDivElement>(null!)
  const isHovered = useHover(ref)

  return (
    <div className="relative group">
      <span className="absolute group-hover:text-primary transition-colors text-[1.4rem] font-libertad flex-center w-6 h-6 top-2.5 -left-8">
        0{props.idx + 1}
      </span>
      <div className="group overflow-hidden relative w-fit h-fit">
        <div
          ref={ref}
          onClick={() => {
            setShouldTransition(true)
            setRoute(props.path)
          }}
          className="flex h-fit cursor-pointer p-2  duration-[400ms] ease-[var(--ease)] group-hover:bg-primary font-anton text-7xl  uppercase"
        >
          <div className="flex">
            {props.path.split('').map((l, i) => (
              <motion.span
                animate={
                  isHovered
                    ? { y: -80, rotateX: 180, opacity: 0.1 }
                    : { y: 0, rotateX: 0, opacity: 1 }
                }
                transition={{ duration: 0.4, delay: 0.02 * i }}
                className="w-fit flex"
              >
                {l}
              </motion.span>
            ))}
          </div>

          <div className="flex absolute">
            {props.path.split('').map((l, i) => (
              <motion.span
                animate={
                  isHovered
                    ? { y: 0, rotateX: 0, opacity: 1 }
                    : { y: 80, rotateX: -180, opacity: 0.1 }
                }
                transition={{ duration: 0.4, delay: 0.02 * i }}
                className="w-fit flex"
              >
                {l}
              </motion.span>
            ))}
          </div>
        </div>
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
            className="fixed z-[1000] h-[100vh] opacity-100  bg-black w-full"
          >
            <div className="h-full w-full fixed">
              <ul className="h-full w-full flex flex-col items-center justify-center">
                {links.map((link, idx) => (
                  <Option key={idx} idx={idx} path={link}>
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
            className="z-[999] h-[100vh] bg-primary fixed w-full left-0"
          />
        </>
      )}
    </AnimatePresence>
  )
}

export default Menu
