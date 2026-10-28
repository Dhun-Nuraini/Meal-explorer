import { Link } from 'react-router-dom'

const MealCard = ({ meal }) => {
  return (
    <Link to={`/meal/${meal.idMeal}`} className="meal-card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="meal-card-info">
        <h2>{meal.strMeal}</h2>
        <p>{meal.strArea || meal.strCategory}</p>
      </div>
    </Link>
  )
}

export default MealCard
