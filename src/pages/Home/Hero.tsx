import { useSetRecoilState } from 'recoil'
import { cursorVariantAtom } from '../../recoil/atoms'
import { Typewriter } from '../../components/Typewriter/Typewriter'

const Hero = () => {
  const strings = [
    'modern & innovative digital solutions',
    'e-commerces, web systems, landing pages, blogs & more',
    'front-end & back-end development',
    'UX & UI best pratices',
  ]

  const setCursorVariant = useSetRecoilState(cursorVariantAtom)

  return (
    <main className="mx-auto px-2 font-anton md:-translate-y-16 md:-translate-x-16  2xl:-translate-y-24 2xl:-translate-x-24">
      <h1
        className="text-6xl md:text-7xl mb-4"
        onMouseEnter={() => setCursorVariant('variant-1')}
        onMouseLeave={() => setCursorVariant('default')}
      >
        creative developer
        <span className="text-primary">.</span>
      </h1>

      <p
        className="font-montserrat absolute md:text-2xl"
        onMouseEnter={() => setCursorVariant('variant-1')}
        onMouseLeave={() => setCursorVariant('default')}
      >
        <Typewriter texts={strings} initialDelay={4800} />
      </p>
    </main>
  )
}

export default Hero
