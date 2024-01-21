import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const RouletteText = ({
  text,
  className,
  isParentHovered,
}: {
  text: string
  className: string
  isParentHovered?: boolean
}) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const textArr = [...text]
  const textLength = textArr.length
  const maxRoulettes = 10

  const [roulettedTextArr, setRoulettedTextArr] = useState(textArr)
  const [shouldRoulette, setShouldRoulette] = useState(isParentHovered || false)
  const [idx, setIdx] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    const newRoulettedTextArr = [...roulettedTextArr]
    const cd =
      count < maxRoulettes
        ? 5 + count * ((2.5 * count) / maxRoulettes)
        : 10 + count * 1.5

    if (shouldRoulette && count < maxRoulettes) {
      newRoulettedTextArr[idx] = alphabet[Math.floor(Math.random() * 26)]

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
  }, [shouldRoulette, roulettedTextArr, count, isParentHovered])

  useEffect(() => {
    if (isParentHovered) setShouldRoulette(isParentHovered)
  }, [isParentHovered])

  return (
    <span
      onMouseEnter={() => {
        if (!shouldRoulette) setShouldRoulette(true)

        console.log('count ', count)
      }}
      className={twMerge(['flex', className])}
    >
      {roulettedTextArr.map((letter, idx) => (
        <span key={idx}>{letter}</span>
      ))}
    </span>
  )
}
