import { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'

const Features = lazy(() => import('./pages/Features').then(m => ({ default: m.Features })))
const Install = lazy(() => import('./pages/Install').then(m => ({ default: m.Install })))
const HowItWorks = lazy(() => import('./pages/HowItWorks').then(m => ({ default: m.HowItWorks })))
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })))
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })))

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem('dalam-theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('dalam-theme', theme)
  }, [theme])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <main>
          <Suspense fallback={<div className="page" style={{ textAlign: 'center', paddingTop: '4rem' }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/install" element={<Install />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
