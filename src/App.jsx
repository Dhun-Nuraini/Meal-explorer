import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { useEffect, useLayoutEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MealDetails from './pages/MealDetails'
import NotFound from './pages/NotFound'

const ScrollManager = () => {
  const location = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem(`scroll-${location.key}`, String(window.scrollY))
    }

    window.addEventListener('scroll', saveScrollPosition, { passive: true })
    saveScrollPosition()

    return () => {
      saveScrollPosition()
      window.removeEventListener('scroll', saveScrollPosition)
    }
  }, [location.key])

  useLayoutEffect(() => {
    const savedPosition = Number(sessionStorage.getItem(`scroll-${location.key}`) || 0)

    if (navigationType !== 'POP') {
      window.scrollTo(0, 0)
      return
    }

    let attempts = 0
    let frameId

    const restoreScrollPosition = () => {
      window.scrollTo(0, savedPosition)
      attempts += 1

      if (attempts < 10 && document.documentElement.scrollHeight < savedPosition + window.innerHeight) {
        frameId = window.requestAnimationFrame(restoreScrollPosition)
      }
    }

    frameId = window.requestAnimationFrame(restoreScrollPosition)
    return () => window.cancelAnimationFrame(frameId)
  }, [location.key, navigationType])

  return null
}

const PageRoutes = () => (
  <div className="app">
    <ScrollManager />
    <Navbar />
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <footer className="footer">Meal Finder</footer>
  </div>
)

const App = () => (
  <BrowserRouter>
    <PageRoutes />
  </BrowserRouter>
)

export default App
