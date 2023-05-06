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
