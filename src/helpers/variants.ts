import { Variants } from 'framer-motion'
import { CursorVariants } from '../types'

export interface MousePosition {
  x: number
  y: number
}

export const cursorVariants: (mousePosition: MousePosition) => Variants = (
  mousePosition: MousePosition
) => ({
  default: (variant: CursorVariants) => {
    const props = {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      border: '0px solid red',
    }

    if (variant === 'variant-2') {
      return {
        ...props,
        mixBlendMode: 'darken',
      }
    }

    if (variant === 'variant-3') {
      return {
        ...props,
        mixBlendMode: 'difference',
      }
    }

    return props
  },
})

export const cursorStyleVariants: Variants = {
  default: {
    width: 8,
    height: 8,
    backgroundColor: '#ed0c32',
    border: '2px solid #ed0c32',
    transition: {
      type: 'tween',
      duration: 0.25,
      ease: 'easeIn',
    },
  },
  homeLogo: {
    width: 16,
    height: 16,
    backgroundColor: '#ed0c32',
    border: '2px solid #ed0c32',
    transition: {
      type: 'tween',
      duration: 0.25,
      ease: 'easeIn',
    },
  },
  homeMenuIcon: {
    width: 8 * 7,
    height: 8 * 7,
    backgroundColor: 'transparent',
    border: '2px solid #ed0c32',
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeIn',
    },
    transitionEnd: {},
  },
  homeMenuOption: {
    width: 32,
    height: 32,
    backgroundColor: '#ed0c32',
    border: '2px solid #ed0c32',
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeIn',
    },
  },
  homeHeading: {
    width: 8 * 14,
    height: 8 * 14,
    backgroundColor: '#ed0c32',
    border: '2px solid #ed0c32',
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeIn',
    },
  },
  homeTypewriter: {
    width: 32,
    height: 32,
    backgroundColor: '#ed0c32',
    border: '2px solid #ed0c32',
    transition: {
      type: 'tween',
      duration: 0.15,
      ease: 'easeIn',
    },
  },
  homeOpenSocialIconsIcon: {
    width: 8 * 7,
    height: 8 * 7,
    backgroundColor: 'transparent',
    border: '2px solid #ed0c32',
    transition: {
      type: 'tween',
      duration: 0.25,
      ease: 'easeIn',
    },
  },
  homeSocialIcon: {
    width: 10 * 4,
    height: 10 * 4,
    backgroundColor: 'transparent',
    border: '2px solid #ed0c32',
    transition: {
      type: 'tween',
      duration: 0.25,
      ease: 'easeIn',
    },
  },
  homeSoundIcon: {
    width: 8 * 7,
    height: 8 * 7,
    backgroundColor: 'transparent',
    border: '2px solid #ed0c32',
    transition: {
      type: 'tween',
      duration: 0.25,
      ease: 'easeIn',
    },
  },
}

export const socialIconContainerVariants: Variants = {
  close: (idx) => ({
    y: '80%',
    opacity: 0,
    transition: {
      duration: 0.25,
      delay: (2 - idx) * 0.25,
    },
  }),
  open: (idx) => ({
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.15,
      delay: idx * 0.15,
    },
  }),
}

export const soundLabelVariants: Variants = {
  hidden: {
    x: 48,
    y: 16,
    opacity: 0,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
  },
  visible: {
    x: 56,
    y: 16,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.55,
    },
  },
}
