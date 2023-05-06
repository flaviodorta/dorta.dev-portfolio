import { ReactElement } from 'react'

export const pop = (
  arr: (string | ReactElement)[]
): (string | ReactElement)[] => {
  const arrCopy = [...arr]
  arrCopy.pop()
  return arrCopy
}

export const getAllIndexes = <T>(arr: T[], val: T) => {
  var indexes = [],
    i = -1
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i)
  }
  return indexes
}

export const randomIntegerInterval = (val: number, variation: number) => {
  const max = val + variation
  const min = val - variation
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const cancelableDelay = (cb: () => void, delay: number) => {
  let timer: NodeJS.Timeout
  const timerCb = () => {
    timer = setTimeout(cb, delay)
  }
  const clearTimer = () => clearTimeout(timer)
  return [timerCb, clearTimer]
}
