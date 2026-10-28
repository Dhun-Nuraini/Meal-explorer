import { useEffect, useState } from 'react'
import MealCard from '../components/MealCard'
import SearchBar from '../components/SearchBar'
import { searchMeals } from '../services/meals'

function Home() {
  const [query, setQuery] = useState('chicken')
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadMeals(searchTerm) {
    setLoading(true)
    setError('')

    try {
      const results = await searchMeals(searchTerm)
      setMeals(results)
    } catch {
      setMeals([])
      setError('Could not load meals. Check your internet connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMeals('chicken')
  }, [])

  function handleSearch(event) {
    event.preventDefault()
    loadMeals(query.trim())
  }

  return (
    <section>
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />

      {loading && <p className="message">Loading meals...</p>}
      {error && <p className="message">{error}</p>}
      {!loading && !error && meals.length === 0 && (
        <p className="message">No meals found.</p>
      )}

      {!loading && meals.length > 0 && (
        <div className="meal-grid">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Home
