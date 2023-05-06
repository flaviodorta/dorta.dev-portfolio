import { useCallback, useEffect, useRef, useReducer, ReactElement } from 'react'
import {
  getAllIndexes,
  pop,
  randomIntegerInterval,
} from '../../helpers/functions'
import { nanoid } from 'nanoid'
import { isEqual } from 'lodash'

export interface TypewriterProps {
  texts: string[]
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
  initialDelay?: number | null
}

export const useTypewriter = ({
  texts = [],
  typeSpeed = 70,
  deleteSpeed = 150,
  delaySpeed = 2000,
  initialDelay = null,
}: TypewriterProps): (string | ReactElement)[] => {
  const initialState = initialDelay
    ? {
        isDeleting: false,
        speed: randomIntegerInterval(typeSpeed, 50),
        text: [],
        countText: 0,
        indexWord: 0,
        isInitialDelay: true,
      }
    : {
        isDeleting: false,
        speed: randomIntegerInterval(typeSpeed, 50),
        text: [],
        countText: 0,
        indexWord: 0,
      }
  const [
    { isDeleting, speed, text, countText, indexWord, isInitialDelay },
    dispatch,
  ] = useReducer(reducer, initialState)

  const firstRun = useRef(true)

  const turnTextCharInReactElement = useCallback(
    (text: string, chars: string | string[]) => {
      const textArr: (string | ReactElement)[] = text.split('')
      let charElement: ReactElement

      if (Array.isArray(chars)) {
        chars.forEach((char) => {
          const allIndexesChar = getAllIndexes(textArr, char)
          if (textArr.includes(char)) {
            charElement = (
              <span key={nanoid()} className="font-semibold text-primary">
                {char}
              </span>
            )

            allIndexesChar.forEach((i) => {
              textArr[i] = charElement
            })
          }
        })
      } else {
        if (textArr.includes(chars)) {
          const allIndexesChar = getAllIndexes(textArr, chars)
          charElement = (
            <span
              key={nanoid()}
              className="font-bold font-montserrat text-primary"
            >
              {chars}
            </span>
          )

          allIndexesChar.forEach((i) => {
            textArr[i] = charElement
          })
        }
      }

      return textArr
    },
    []
  )

  const handleTyping = useCallback(() => {
    const indexText = countText % texts.length
    const textArr = turnTextCharInReactElement(texts[indexText], '&')
    const word = textArr[indexWord]

    if (isInitialDelay && initialDelay) {
      const wait = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms))
      }

      ;(async function () {
        await wait(initialDelay)
        dispatch({ type: 'IS_INITIAL_DELAY' })
      })()
    } else {
      if (!isDeleting) {
        dispatch({
          type: 'TYPING',
          payload: word,
          speed: randomIntegerInterval(typeSpeed, 25),
        })

        if (indexWord === textArr.length - 1) {
          dispatch({
            type: 'TRANSITION_FINAL',
            payload: randomIntegerInterval(delaySpeed, 500),
          })
        }
      } else {
        dispatch({
          type: 'DELETING',
          speed: randomIntegerInterval(deleteSpeed, 30),
        })

        if (isEqual(text, [])) dispatch({ type: 'TRANSITION_START' })
      }
    }
  }, [
    isDeleting,
    countText,
    turnTextCharInReactElement,
    indexWord,
    texts,
    text,
    delaySpeed,
    deleteSpeed,
    typeSpeed,
    initialDelay,
    isInitialDelay,
  ])

  useEffect(() => {
    let typing: NodeJS.Timeout
    if (!firstRun.current) {
      typing = setTimeout(handleTyping, speed)
    }
    return () => {
      clearTimeout(typing)
      firstRun.current = false
    }
  }, [handleTyping, speed])

  return text
}

export type State = {
  speed: number
  text: (string | ReactElement)[]
  isDeleting: boolean
  countText: number
  indexWord: number
  isInitialDelay?: boolean
}

export type Action =
  | { type: 'TRANSITION_FINAL'; payload: number }
  | { type: 'TYPING'; payload: string | ReactElement; speed: number }
  | { type: 'DELETING'; speed: number }
  | { type: 'TRANSITION_START' }
  | { type: 'IS_INITIAL_DELAY' }

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TRANSITION_FINAL':
      return {
        ...state,
        isDeleting: true,
        speed: action.payload,
        indexWord: 0,
      }
    case 'TYPING':
      return {
        ...state,
        speed: action.speed,
        text: [...state.text, action.payload],
        indexWord: state.indexWord + 1,
      }
    case 'DELETING':
      return {
        ...state,
        speed: action.speed,
        text: pop(state.text),
      }
    case 'TRANSITION_START':
      return {
        ...state,
        isDeleting: false,
        countText: state.countText + 1,
      }
    case 'IS_INITIAL_DELAY':
      return {
        ...state,
        isInitialDelay: false,
      }
    default:
      return state
  }
}
