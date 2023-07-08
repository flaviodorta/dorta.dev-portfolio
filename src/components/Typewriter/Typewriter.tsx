import { TypewriterProps, useTypewriter } from './useTypewrite'
import { Cursor } from './Cursor'

type Props = React.ComponentPropsWithoutRef<'div'> & {
  texts?: string[]
  typeSpeed?: number
  deleteSpeed?: number
  delaySpeed?: number
  initialDelay?: number | null
  cursorStyle?: string
  cursor?: boolean
}

export const Typewriter = ({
  texts = [],
  typeSpeed = 70,
  deleteSpeed = 100,
  delaySpeed = 2000,
  initialDelay = null,
  cursorStyle = '|',
  cursor = true,
  className,
}: Props) => {
  const text = useTypewriter({
    texts,
    typeSpeed,
    deleteSpeed,
    delaySpeed,
    initialDelay,
  })

  return (
    <div className={className}>
      <span>{text}</span>
      {cursor && <Cursor cursorStyle={cursorStyle} />}
    </div>
  )
}
