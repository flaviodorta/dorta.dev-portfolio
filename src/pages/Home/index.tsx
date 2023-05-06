import Navbar from '../../components/Navbar'
import SpaceBackground from '../../components/canvas/Space'
import { Footer } from './Footer'
import Hero from './Hero'

const Home = () => {
  return (
    <>
      <SpaceBackground />

      <div className="p-8 absolute flex flex-col justify-between top-0 left-0 w-full h-full">
        <Navbar />
        <Hero />
        <Footer />
      </div>
    </>
  )
}

export default Home
