import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const RouletteText = (props: {
  text: string
  className: string
  shouldRoulette?: boolean
  type: 'alphabet' | 'numbers'
  speed: number
}) => {
  const { text, className, type, speed } = props

  const baseTextRandomized = {
    alphabet: 'abcdefghijklmnopqrstuvwxyz'.split('')[
      Math.floor(Math.random() * 26)
    ],
    numbers: '0123456789'.split('')[Math.floor(Math.random() * 10)],
  }

  console.log(text)

  const textArr = [...text]
  const textLength = textArr.length
  const maxRoulettes = 10

  const [roulettedTextArr, setRoulettedTextArr] = useState(textArr)
  const [shouldRoulette, setShouldRoulette] = useState(
    props.shouldRoulette || false
  )
  const [idx, setIdx] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    const newRoulettedTextArr = [...roulettedTextArr]
    const cd =
      count < maxRoulettes
        ? speed / 2 + count * ((2.5 * count) / maxRoulettes)
        : speed + count * 1.5

    if (shouldRoulette && count < maxRoulettes) {
      newRoulettedTextArr[idx] = baseTextRandomized[type]

      timer = setTimeout(() => {
        setRoulettedTextArr(newRoulettedTextArr)

        if (idx === textLength - 1) {
          setCount((c) => c + 1)
          setIdx(0)
        } else setIdx((i) => i + 1)
      }, cd)
    }

    if (count === maxRoulettes) {
      if (idx < textLength) {
        newRoulettedTextArr[idx] = textArr[idx]
        timer = setTimeout(() => {
          setRoulettedTextArr(newRoulettedTextArr)
          setIdx((i) => i + 1)
        }, cd)
      } else {
        timer = setTimeout(() => setRoulettedTextArr(textArr), cd)
        setCount(0)
        setIdx(0)
        setShouldRoulette(false)
      }
    }

    return () => clearTimeout(timer)
  }, [shouldRoulette, roulettedTextArr, count, props.shouldRoulette])

  useEffect(() => {
    if (props.shouldRoulette) setShouldRoulette(props.shouldRoulette)
  }, [props.shouldRoulette])

  return (
    <span
      onMouseEnter={() => {
        if (!shouldRoulette) setShouldRoulette(true)
      }}
      className={twMerge(['flex', className])}
    >
      {roulettedTextArr.map((letter, idx) => (
        <span key={idx}>{letter}</span>
      ))}
    </span>
  )
}
