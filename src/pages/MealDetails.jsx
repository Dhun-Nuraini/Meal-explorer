import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getIngredients, getMeal } from '../services/meals'

function MealDetails() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadMeal() {
      setLoading(true)
      setError('')

      try {
        const result = await getMeal(id)
        setMeal(result)
      } catch {
        setError('Could not load this recipe. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadMeal()
  }, [id])

  if (loading) return <p className="message">Loading recipe...</p>
  if (error) return <p className="message">{error}</p>
  if (!meal) return <p className="message">Recipe not found.</p>

  const ingredients = getIngredients(meal)

  return (
    <article className="recipe-page">
      <Link to="/" className="back-link">← Back to meals</Link>
      <div className="recipe-top">
        <img className="recipe-image" src={meal.strMealThumb} alt={meal.strMeal} />
        <div className="recipe-summary">
          <h1>{meal.strMeal}</h1>
          {meal.strCategory && <p><strong>Category:</strong> {meal.strCategory}</p>}
          {meal.strArea && <p><strong>Area:</strong> {meal.strArea}</p>}
          {meal.strTags && <p><strong>Tags:</strong> {meal.strTags}</p>}
          {meal.strYoutube && <p><a href={meal.strYoutube} target="_blank" rel="noreferrer">Watch recipe</a></p>}
          {meal.strSource && <p><a href={meal.strSource} target="_blank" rel="noreferrer">Recipe source</a></p>}
        </div>
      </div>

      <section className="recipe-section">
        <h2>Ingredients</h2>
        <ul className="ingredients-list">
          {ingredients.map((ingredient, index) => (
            <li key={`${ingredient.name}-${index}`}>
              <span>{ingredient.name}</span>
              <span>{ingredient.measure}</span>
            </li>
          ))}
        </ul>
      </section>

      {meal.strInstructions && (
        <section className="recipe-section">
          <h2>Instructions</h2>
          <p className="instructions">{meal.strInstructions}</p>
        </section>
      )}
    </article>
  )
}

export default MealDetails
