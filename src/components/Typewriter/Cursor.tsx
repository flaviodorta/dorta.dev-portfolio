interface CursorProps {
  cursorStyle?: string
}

export const Cursor = ({ cursorStyle = '|' }: CursorProps): JSX.Element => {
  return (
    <span className="font-libertad font-thin inline-block relative left-[1px] animate-fast-pulse text-primary">
      {cursorStyle}
    </span>
  )
}
