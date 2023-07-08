import Triangles from '../../components/Triangles'
import { ScrollTrigger } from 'gsap/all'
import gsap, { Power1 } from 'gsap'
import { Suspense, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { CgArrowLongRight } from 'react-icons/cg'
import { transitionFinishedAtom } from '../../recoil/atoms'
import { useRecoilState } from 'recoil'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const ref = useRef<HTMLDivElement>(null!)

  const ctx = useRef<ReturnType<typeof gsap.context>>()
  const tl = useRef<gsap.core.Timeline>()
  const [transitionFinished, setTransitionFinished] = useRecoilState(
    transitionFinishedAtom
  )

  useEffect(() => {
    ctx.current = gsap.context(() => {
      tl.current = gsap.timeline()
      gsap.fromTo(
        '.slogan',
        { top: '400px' },
        {
          top: 0,
          duration: 1.5,
          delay: 0.8,
          stagger: {
            amount: 0.5,
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
      {/* <Suspense fallback={null}> */}
      {transitionFinished && (
        // <motion.div
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   transition={{ duration: 2 }}
        // >
        <Triangles />
        // </motion.div>
      )}
      {/* </Suspense> */}

      <div className="left-[2rem] h-fit right-[2rem] lg:left-[10rem] absolute top-[10rem] flex flex-col gap-[4rem]">
        <div
          ref={ref}
          className="font-anton uppercase text-[4rem] md:text-[8rem] lg:text-[10rem] left-0"
        >
          <div
            className={twMerge(['mr-auto ml-0 leading-none overflow-hidden'])}
          >
            <div className="slogan relative top-[400px] leading-none tracking-wide">
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
              {/* <span className="overflow-hidden text-primary" id="char2">
                .
              </span> */}
            </div>
          </div>
        </div>

        <div className="w-full  flex flex-col-reverse gap-[4rem] lg:flex-row items-center">
          <div className="flex w-full lg:w-1/2 flex-col gap-[4rem]">
            <div className="text-lg font-share-tech">
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
            </div>

            <div className="flex items-center gap-[1rem] text-[2rem] lg:text-[3rem] font-share-tech text-white">
              See my works
              <span>
                <CgArrowLongRight />
              </span>
            </div>
          </div>

          <div className="w-1/2 ">
            <img
              className="mx-auto w-[300px] h-auto"
              src="eu1.jpeg"
              alt="Flávio Dorta"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
