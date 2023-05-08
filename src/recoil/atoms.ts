import { atom } from 'recoil'
import { CursorVariants } from '../types'

export const cursorVariantAtom = atom<CursorVariants>({
  key: 'cursor-variant',
  default: 'default',
})

export const soundAtom = atom({
  key: 'sound',
  default: true,
})

export const firstAccessAtom = atom({
  key: 'first-access',
  default: true,
})

export const shouldTransitionAtom = atom({
  key: 'should-transition',
  default: false,
})

export const routerAtom = atom({
  key: 'route',
  default: '/',
})
