import { useEffect } from 'react'
import { StarsCanvas } from '../../components/StarCanvas'
import { WorkCard } from '../../components/WorkCard'
import { motion } from 'framer-motion'

export const Works = () => {
  const cards: { title: string; tags: string[] }[] = [
    { title: 'matrix effect', tags: ['react', 'nodejs', 'html'] },
    { title: 'matrix effect', tags: ['react', 'nodejs', 'html'] },
    { title: 'matrix effect', tags: ['react', 'nodejs', 'html'] },
    { title: 'matrix effect', tags: ['react', 'nodejs', 'html'] },
    { title: 'matrix effect', tags: ['react', 'nodejs', 'html'] },
    { title: 'matrix effect', tags: ['react', 'nodejs', 'html'] },
    { title: 'matrix effect', tags: ['react', 'nodejs', 'html'] },
    { title: 'matrix effect', tags: ['react', 'nodejs', 'html'] },
  ]

  return (
    <>
      <div className="w-full h-full scrollbar-hidden overflow-y-auto">
        <div className="w-[50%] h-full mx-auto">
          <motion.div
            animate={{
              transition: {
                staggerChildren: 0.4,
              },
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-[20%]"
          >
            {cards.map(({ title, tags }, idx) => (
              <WorkCard title={title} tags={tags} idx={idx} />
            ))}
          </motion.div>
        </div>
      </div>
      <StarsCanvas />
    </>
  )
}
