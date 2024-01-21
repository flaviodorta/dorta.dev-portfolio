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
import HamburgerMenu from './HamburgerMenu'

export const Footer = ({ shouldAnimate }: { shouldAnimate: boolean }) => {
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

  return (
    <>
      <motion.div
        initial={false}
        animate={
          shouldAnimate
            ? { opacity: 0, display: 'none' }
            : { opacity: 1, display: 'block' }
        }
        transition={{ delay: 2, duration: 1 }}
        className="fixed left-[20px] bottom-[20px] md:left-[30px] md:bottom-[40px] z-[4000]"
      >
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
              className="hidden md:block top-4 left-2 md:absolute whitespace-nowrap font-libertad font-thin font-white font-thin"
            >
              sound {isSoundOn ? 'off' : 'on'}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={false}
        animate={
          shouldAnimate
            ? { opacity: 0, display: 'none' }
            : { opacity: 1, display: 'block' }
        }
        transition={{ delay: 2.5, duration: 1 }}
        className="fixed right-[20px] bottom-[20px] md:right-[40px] md:bottom-[30px] z-[4000]"
      >
        <div className="z-[2000] w-fit h-[80px] flex items-end justify-end">
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
      </motion.div>
    </>
  )
}
