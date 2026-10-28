import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MealDetails from './pages/MealDetails'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
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
