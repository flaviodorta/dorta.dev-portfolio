import React, { createContext, useContext, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import useSound from 'use-sound'
import { PlayFunction } from 'use-sound/dist/types'
import { isLoadingAtom, soundAtom } from '../recoil/atoms'
import { Howl } from 'howler'
import { CompressedTextureLoader } from 'three'

interface ISounds {
  backgroundSoundRef: React.MutableRefObject<Howl> | null
  onAnimationExitTransitionSound: PlayFunction | null
  hoverMenuOptionSoundPlay: PlayFunction | null
  clickMenuOptionSoundPlay: PlayFunction | null
  openMenuSoundPlay: PlayFunction | null
  hoverCloseMenuIconSoundPlay: PlayFunction | null
  hoverOpenMenuIconSoundPlay: PlayFunction | null
  soundIconSoundPlay: PlayFunction | null
  soundOnPlay: PlayFunction | null
  soundOffPlay: PlayFunction | null
  openSocialIconsSoundPlay: PlayFunction | null
  hoverSocialIconsIconSoundPlay: PlayFunction | null
  hoverSocialIconSoundPlay: PlayFunction | null
  clickSocialIconSoundPlay: PlayFunction | null
  backgroundSoundPlay: PlayFunction | null
}

const initialValue: ISounds = {
  backgroundSoundRef: null,
  onAnimationExitTransitionSound: null,
  hoverMenuOptionSoundPlay: null,
  clickMenuOptionSoundPlay: null,
  openMenuSoundPlay: null,
  hoverCloseMenuIconSoundPlay: null,
  hoverOpenMenuIconSoundPlay: null,
  soundIconSoundPlay: null,
  soundOnPlay: null,
  soundOffPlay: null,
  openSocialIconsSoundPlay: null,
  hoverSocialIconsIconSoundPlay: null,
  hoverSocialIconSoundPlay: null,
  clickSocialIconSoundPlay: null,
  backgroundSoundPlay: null,
}

const SoundsContext = createContext<ISounds>(initialValue)

export const useSoundsContext = () => useContext(SoundsContext)

export function SoundsProvider({ children }: { children: React.ReactNode }) {
  const isSoundOn = useRecoilValue(soundAtom)
  const s = useSetRecoilState(isLoadingAtom)

  const backgroundSoundRef = useRef(
    new Howl({
      src: ['/sounds/background.mp3'],
      loop: true,
      preload: 'metadata',
      onload: () => {
        s(true)
      },
    })
  )

  const [onAnimationExitTransitionSound] = useSound(
    '/sounds/page-transition-exit.mp3',
    {
      volume: 0.1,
      soundEnabled: isSoundOn,
      onload: () => console.log('load 2'),
    }
  )

  const [hoverMenuOptionSoundPlay] = useSound('/sounds/hover-menu-option.wav', {
    volume: 0.1,
    soundEnabled: isSoundOn,
    onload: () => console.log('load 3'),
  })

  const [clickMenuOptionSoundPlay] = useSound('/sounds/click-menu-option.wav', {
    volume: 0.1,
    soundEnabled: isSoundOn,
    onload: () => console.log('load 4'),
  })

  const [openMenuSoundPlay] = useSound('/sounds/open-menu.wav', {
    volume: 0.1,
    soundEnabled: isSoundOn,
    onload: () => console.log('load 5'),
  })

  const [hoverCloseMenuIconSoundPlay] = useSound(
    '/sounds/hover-close-menu-icon.wav',
    {
      volume: 0.1,
      soundEnabled: isSoundOn,
      onload: () => console.log('load 6'),
    }
  )

  const [hoverOpenMenuIconSoundPlay] = useSound(
    '/sounds/hover-open-menu-icon.wav',
    {
      volume: 0.1,
      soundEnabled: isSoundOn,
      onload: () => console.log('load 7'),
    }
  )

  const [soundIconSoundPlay] = useSound('/sounds/hover-sound-icon.wav', {
    volume: 0.1,
    soundEnabled: isSoundOn,
    onload: () => console.log('load 8'),
  })

  const [soundOnPlay] = useSound('/sounds/turn-sound-on.wav', {
    volume: 0.1,
    soundEnabled: isSoundOn,
    onload: () => console.log('load 9'),
  })

  const [soundOffPlay] = useSound('/sounds/turn-sound-off.wav', {
    volume: 0.1,
    soundEnabled: isSoundOn,
    onload: () => console.log('load 10'),
  })

  const [openSocialIconsSoundPlay] = useSound('/sounds/open-social-icons.wav', {
    volume: 0.1,
    soundEnabled: isSoundOn,
    onload: () => console.log('load 11'),
  })

  const [hoverSocialIconsIconSoundPlay] = useSound(
    '/sounds/hover-social-icons-icon.wav',
    {
      volume: 0.1,
      soundEnabled: isSoundOn,
      onload: () => console.log('load 12'),
    }
  )

  const [hoverSocialIconSoundPlay] = useSound('/sounds/hover-social-icon.wav', {
    volume: 0.1,
    soundEnabled: isSoundOn,
    onload: () => console.log('load 13'),
  })

  const [clickSocialIconSoundPlay] = useSound('/sounds/click-social-icon.wav', {
    volume: 0.1,
    soundEnabled: isSoundOn,
    onload: () => console.log('load 14'),
  })

  const [backgroundSoundPlay] = useSound('/sounds/click-social-icon.wav', {
    volume: 0.1,
    soundEnabled: isSoundOn,
    onload: () => console.log('load 15'),
  })

  const sounds: ISounds = {
    backgroundSoundRef,
    onAnimationExitTransitionSound,
    hoverMenuOptionSoundPlay,
    clickMenuOptionSoundPlay,
    openMenuSoundPlay,
    hoverCloseMenuIconSoundPlay,
    hoverOpenMenuIconSoundPlay,
    soundIconSoundPlay,
    soundOnPlay,
    soundOffPlay,
    openSocialIconsSoundPlay,
    hoverSocialIconsIconSoundPlay,
    hoverSocialIconSoundPlay,
    clickSocialIconSoundPlay,
    backgroundSoundPlay,
  }

  return (
    <SoundsContext.Provider value={sounds}>{children}</SoundsContext.Provider>
  )
}
