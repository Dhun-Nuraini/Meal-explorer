import { useEffect, useState } from 'react'
import MealCard from '../components/MealCard'
import SearchBar from '../components/SearchBar'
import { getChickenMeals } from '../services/meals'

const Home = () => {
  const [query, setQuery] = useState('')
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMeals = async () => {
      try {
        const results = await getChickenMeals()
        setMeals(results)
      } catch {
        setError('Could not load chicken meals. Check your internet connection and try again.')
      } finally {
        setLoading(false)
      }
    }

    loadMeals()
  }, [])

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(query.toLowerCase().trim())
  )

  return (
    <section>
      <SearchBar value={query} onChange={setQuery} />

      {loading && <p className="message">Loading chicken meals...</p>}
      {error && <p className="message">{error}</p>}
      {!loading && !error && filteredMeals.length === 0 && (
        <p className="message">No chicken meals found.</p>
      )}

      {!loading && filteredMeals.length > 0 && (
        <div className="meal-grid">
          {filteredMeals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Home
