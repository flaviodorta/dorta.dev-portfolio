import { motion } from 'framer-motion'
import { transitionFinishedAtom } from '../recoil/atoms'
import { useRecoilValue } from 'recoil'
import { CgArrowLongRight } from 'react-icons/cg'
import { RouletteText } from './RoulleteText'
import { useState } from 'react'

const TagCard = ({ title }: { title: string }) => {
  return (
    <li className="h-[24px] lg:h-[26px] p-2 ml-2 font-libertad text-[10px] lg:text-xs flex-center text-gray-300 bg-black border-[1px] border-gray-500 rounded-[5px]">
      {title}
    </li>
  )
}

export const WorkCard = ({
  title,
  tags,
  idx,
}: {
  title: string
  tags?: string[]
  idx: number
}) => {
  const transitionFinished = useRecoilValue(transitionFinishedAtom)
  const [shouldRoulette, setShouldRolette] = useState(false)

  return (
    <a
      onMouseEnter={() => {
        if (!shouldRoulette) setShouldRolette(true)
      }}
      onMouseLeave={() => setShouldRolette(false)}
      href="#"
      className="group outline-none"
    >
      <motion.div
        initial={{
          y: 150,
          opacity: 0,
          display: 'none',
        }}
        animate={
          transitionFinished && {
            y: idx % 2 == 0 ? 40 : 0,
            opacity: 1,
            display: 'block',
          }
        }
        transition={{ delay: 0.7, duration: 0.8 }}
        className="h-[20rem] w-full relative"
      >
        <div className="h-[90%] w-full">
          <img
            src="/images/works/work1.png"
            className="max-w-full w-full h-full object-cover"
          />
        </div>

        <ul className="absolute flex items-center left-0 top-0 w-full h-10">
          {tags && tags.map((title) => <TagCard title={title} />)}
        </ul>

        <div className="w-full h-[10%] border-b-[1px] border-gray-600">
          <div className="px-2 flex items-center text-xs lg:text-sm font-libertad h-full">
            <div>
              <span className="text-gray-500">project:</span>
              <span className="transition-[text-shadow] duration-300 text-gray-300 ml-4">
                {title}
              </span>
            </div>

            <div className="group ml-auto mr-10 flex items-center">
              <RouletteText
                text="link"
                className="group-hover:text-shadow text-[10px] lg:text-xs transition-all duration-200"
                shouldRoulette={shouldRoulette}
                type="alphabet"
                speed={1}
              />

              <span className="mx-1 group-hover:translate-x-1.5 transition-all duration-200 ease-[var(--ease)]">
                <CgArrowLongRight />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </a>
  )
}
