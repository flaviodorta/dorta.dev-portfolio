import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { SoundsProvider } from './context/SoundsContext'
import { RecoilRoot } from 'recoil'
import Intro from './pages/Intro'
import About from './pages/About'
import { Works } from './pages/Works'

export function App() {
  return (
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
  )
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
