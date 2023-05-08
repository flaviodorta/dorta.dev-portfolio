import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { SoundsProvider } from './context/SoundsContext'
import { RecoilRoot } from 'recoil'
import Intro from './pages/Intro'

export function App() {
  return (
    <RecoilRoot>
      <SoundsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/home" element={<Home />} />
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
