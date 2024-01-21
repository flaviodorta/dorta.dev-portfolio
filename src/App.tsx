import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { SoundsProvider } from './context/SoundsContext'
import { RecoilRoot } from 'recoil'
import About from './pages/About'
import { Works } from './pages/Works'
import { ReactLenis } from '@studio-freight/react-lenis'

export function App() {
  return (
    // <ReactLenis root>
    <RecoilRoot>
      <SoundsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </SoundsProvider>
    </RecoilRoot>
    // </ReactLenis>
  )
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
