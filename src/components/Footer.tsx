import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useRef } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { cursorVariantAtom, soundAtom } from '../recoil/atoms'
import {
  socialIconContainerVariants,
  soundLabelVariants,
} from '../helpers/variants'
import { TbNorthStar } from 'react-icons/tb'
import GitHub from './icons/Github'
import LinkedIn from './icons/Linkedin'
import Instagram from './icons/Instagram'
import { useSoundsContext } from '../context/SoundsContext'
import { SoundIcon } from './SoundIcon'
import { useToggle } from 'usehooks-ts'
import { twMerge } from 'tailwind-merge'

export const Footer = () => {
  const [isSoundOn, setIsSoundOn] = useRecoilState(soundAtom)
  const setCursorVariant = useSetRecoilState(cursorVariantAtom)
  const [shouldOpenSocialIcons, toggleShouldOpenSocialIcons] = useToggle(false)
  const [soundLabel, toggleSoundLabel] = useToggle(false)

  const soundIconRef = useRef<HTMLDivElement>(null)
  const openSocialsIconsIconRef = useRef<HTMLDivElement>(null)

  const {
    soundIconSoundPlay,
    soundOnPlay,
    soundOffPlay,
    openSocialIconsSoundPlay,
    hoverSocialIconSoundPlay,
    hoverSocialIconsIconSoundPlay,
    clickSocialIconSoundPlay,
  } = useSoundsContext()

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn)
    if (soundLabel === true) {
      soundOffPlay!()
    } else {
      soundOnPlay!()
    }
  }

  const onMouseEnterSoundIcon = () => {
    soundIconSoundPlay!()
    setCursorVariant('variant-1')
    toggleSoundLabel()
  }

  const onMouseLeaveSoundIcon = () => {
    setCursorVariant('default')
    toggleSoundLabel()
  }

  const onClickSocialIcon = () => clickSocialIconSoundPlay!()

  const onMouseEnterSocialIcon = () => {
    setCursorVariant('variant-1')
    hoverSocialIconSoundPlay!()
  }

  const onMouseLeaveSocialIcon = () => setCursorVariant('default')

  const onClickOpenSocialsIconsIcon = () => {
    toggleShouldOpenSocialIcons()
    openSocialIconsSoundPlay!()
  }

  const onMouseEnterOpenSocialsIconsIcon = () => {
    setCursorVariant('variant-1')
    hoverSocialIconsIconSoundPlay!()
  }

  const onMouseLeaveOpenSocialsIconsIcon = () => setCursorVariant('default')

  // const footerIconsVariants: Variants = {
  //   initial: {
  //     opacity: 0,
  //   },
  //   animate: {
  //     opacity: 1,
  //     transition: {
  //       delay: 1.6,
  //       duration: 0.8,
  //     },
  //   },
  // }

  return (
    <footer className="flex items-center justify-between">
      <div className="relative flex flex-col justify-center cursor-pointer">
        {/* sound icon */}
        <div
          ref={soundIconRef}
          onMouseEnter={onMouseEnterSoundIcon}
          onMouseLeave={onMouseLeaveSoundIcon}
          onClick={toggleSound}
        >
          <SoundIcon isSoundOn={isSoundOn} />
        </div>

        <AnimatePresence>
          {soundLabel && (
            <motion.div
              variants={soundLabelVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="hidden md:block top-4 left-2 md:absolute whitespace-nowrap font-share-tech font-white font-thin"
            >
              sound {isSoundOn ? 'off' : 'on'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-fit h-[80px] z-40 flex items-end justify-end">
        <div className="flex flex-col gap-4 justify-end items-center">
          <AnimatePresence>
            {shouldOpenSocialIcons && (
              <>
                <motion.div
                  className="social--icon-container group cursor-pointer"
                  key={2}
                  variants={socialIconContainerVariants}
                  custom={2}
                  initial="close"
                  animate="open"
                  exit="close"
                  onClick={onClickSocialIcon}
                  onMouseEnter={onMouseEnterSocialIcon}
                  onMouseLeave={onMouseLeaveSocialIcon}
                >
                  <GitHub className="social--icon" />
                </motion.div>

                <motion.div
                  className="social--icon-container group cursor-pointer"
                  key={1}
                  variants={socialIconContainerVariants}
                  custom={1}
                  initial="close"
                  animate="open"
                  exit="close"
                  onClick={onClickSocialIcon}
                  onMouseEnter={onMouseEnterSocialIcon}
                  onMouseLeave={onMouseLeaveSocialIcon}
                >
                  <LinkedIn className="social--icon" />
                </motion.div>

                <motion.div
                  className="social--icon-container group cursor-pointer"
                  key={0}
                  variants={socialIconContainerVariants}
                  custom={0}
                  initial="close"
                  animate="open"
                  exit="close"
                  onClick={onClickSocialIcon}
                  onMouseEnter={onMouseEnterSocialIcon}
                  onMouseLeave={onMouseLeaveSocialIcon}
                >
                  <Instagram className="social--icon" />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="group mt-2 relative bottom-2">
            <div
              ref={openSocialsIconsIconRef}
              className="cursor-pointer flex items-end justify-center group-hover:bg-transparent"
              onMouseEnter={onMouseEnterOpenSocialsIconsIcon}
              onMouseLeave={onMouseLeaveOpenSocialsIconsIcon}
              onClick={onClickOpenSocialsIconsIcon}
            >
              <TbNorthStar
                className={twMerge([
                  'w-8 h-8 group-hover:text-primary group-hover:scale-125 group-active:scale-50 duration-300 transition-all',
                  shouldOpenSocialIcons ? 'rotate-90' : '',
                ])}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
