import {useLayoutEffect} from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MealDetails from './pages/MealDetails'
import NotFound from './pages/NotFound'

const scrollToTop = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }, [location.pathname])
}

const App = () => {
  return (
    <BrowserRouter>
      <scrollToTop/>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meal/:id" element={<MealDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="footer">Meal Explorer</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
