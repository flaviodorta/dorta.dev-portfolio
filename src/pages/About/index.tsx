import Triangles from '../../components/Triangles'
import { ScrollTrigger } from 'gsap/all'
import gsap, { Power1 } from 'gsap'
import { Suspense, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { CgArrowLongRight } from 'react-icons/cg'
import {
  cursorVariantAtom,
  routerAtom,
  shouldTransitionAtom,
  transitionFinishedAtom,
} from '../../recoil/atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { motion } from 'framer-motion'
import MagneticDiv from '../../components/MagneticDiv'
import { isMobile } from 'react-device-detect'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const ref = useRef<HTMLDivElement>(null!)
  const setCursorVariant = useSetRecoilState(cursorVariantAtom)

  const ctx = useRef<ReturnType<typeof gsap.context>>()
  const tl = useRef<gsap.core.Timeline>()
  const [transitionFinished, setTransitionFinished] = useRecoilState(
    transitionFinishedAtom
  )
  const setRoute = useSetRecoilState(routerAtom)
  const setShouldTransition = useSetRecoilState(shouldTransitionAtom)

  useEffect(() => {
    ctx.current = gsap.context(() => {
      tl.current = gsap.timeline()
      gsap.fromTo(
        '.slogan',
        { top: '400px' },
        {
          top: 0,
          duration: 1.5,
          delay: 2.3,
          stagger: {
            amount: 0.1,
          },
          ease: Power1.easeInOut,
          scrollTrigger: {
            start: 'top 90%',
            // markers: true,
          },
        }
      )
    }, ref)

    return () => {
      ctx.current?.revert()
      setTransitionFinished(false)
    }
  }, [])

  return (
    <div className="w-full h-full relative">
      <Suspense fallback={null}>
        {transitionFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Triangles />
          </motion.div>
        )}
      </Suspense>

      <div className="pb-[5rem] md:pb-0 h-fit left-[1rem] right-[1rem] md:left-[5rem] md:right-59rem] lg:left-[9rem] lg:right-[9rem] absolute top-[10rem] flex flex-col justify-between">
        <div
          ref={ref}
          className="mb-[4rem] xl:mb-0 h-fit font-anton uppercase text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[10rem] left-0"
        >
          <div
            className={twMerge([
              'h-fit mr-auto ml-0 leading-none overflow-hidden',
            ])}
          >
            <div className="slogan relative leading-none tracking-wide">
              Creative
            </div>
          </div>

          <div
            className={twMerge([
              'mr-auto ml-0 bg-transparent leading-none overflow-hidden',
            ])}
          >
            <div className="slogan relative top-[500px] leading-none tracking-wide">
              Developer
            </div>
          </div>
        </div>

        <div className="w-full h-fit flex flex-col-reverse gap-[4rem] lg:flex-row items-center">
          <div className="flex w-full lg:w-1/2 flex-col gap-[4rem]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.4, type: 'tween' }}
              className="text-lg font-share-tech"
            >
              My name is Flávio Dorta, and I am a JavaScript Fullstack developer
              based in São Paulo. With a strong focus on creative design and
              user-centered solutions, I am ready to offer innovative web
              development services. Leveraging my expertise in JavaScript, I can
              create dynamic and interactive applications that provide a unique
              user experience. My passion for usability and aesthetics drives me
              to find the perfect balance between functionality and beauty. With
              dedication and attention to detail, I strive to exceed clients'
              expectations in every project I undertake. I am always seeking new
              challenges and opportunities to expand my knowledge and skills.
              Let's work together to create captivating and intuitive digital
              products.
            </motion.div>

            <div
              onMouseEnter={() => setCursorVariant('variant-1')}
              onMouseLeave={() => setCursorVariant('default')}
              onClick={() => {
                setShouldTransition(true)
                setRoute('works')
              }}
              className="relative see-works cursor-pointer group px-2 w-fit flex items-center text-[2rem] lg:text-[3rem] font-share-tech text-white"
            >
              <span className="">See my works</span>
              <span className="mx-2 group-hover:translate-x-2 transition-all duration-500 ease-[var(--ease)]">
                <CgArrowLongRight />
              </span>

              <motion.div
                initial={{ height: '100%' }}
                whileInView={{ height: 0 }}
                transition={{
                  duration: 1,
                  delay: isMobile ? 0 : 2.5,
                  ease: 'easeOut',
                  type: 'tween',
                }}
                viewport={{ once: true }}
                className="w-full z-10 bg-black absolute bottom-0 left-0"
              />
            </div>
          </div>

          <MagneticDiv
            scale={1.43}
            tollerance={0.43}
            speed={0.3}
            className="lg:-translate-y-24 group w-[15rem] md:w-[20rem] mx-auto hover:scale-110 transition-all duration-[800ms] ease-[var(--ease)] p-[30px_15px] uppercase relative flex items-center justify-center outline-none"
          >
            <motion.div
              initial={{ height: '100%' }}
              whileInView={{ height: 0 }}
              transition={{
                duration: 1,
                delay: 2.6,
                ease: 'easeOut',
                type: 'tween',
              }}
              viewport={{ once: true }}
              className="w-full z-10 bg-black absolute top-0 left-0"
            />
            <img
              className="mx-auto h-auto bg-cover bg-center group-hover:scale-[1.05] grayscale group-hover:grayscale-0 transition-all duration-[800ms] ease-[var(--ease)] bg-[url('./eu1.jpeg')] "
              src="eu1.jpeg"
              alt="Flávio Dorta"
            />

            <MagneticDiv
              scale={9.1}
              tollerance={2.6}
              speed={0.1}
              className="group-hover:opacity-100 opacity-0 transition-all duration-[400ms] ease-[var(--calc)] absolute left-1/2 -translate-x-1/2 w-fit -bottom-[4rem] font-share-tech text-white"
            >
              Hi, I'm Flávio Dorta :)
            </MagneticDiv>
          </MagneticDiv>
        </div>
      </div>
    </div>
  )
}

export default About
