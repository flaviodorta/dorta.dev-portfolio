import { twMerge } from 'tailwind-merge'

type Props = React.ComponentPropsWithoutRef<'h1'>

const Logo = (props: Props) => {
  return (
    <h1
      className={twMerge([
        'z-[2000] uppercase tracking-wide flex items-center font-anton text-2xl sm:text-4xl',
        props.className,
      ])}
    >
      <span className="text-primary text-3xl sm:text-5xl">{'{'}</span>Dorta
      <span className="text-primary">{'.'}</span>dev
      <span className="text-primary text-3xl sm:text-5xl">{'}'}</span>
    </h1>
  )
}

export default Logo
