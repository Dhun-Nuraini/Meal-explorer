const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=chicken'

export const getChickenMeals = async () => {
  const response = await fetch(apiUrl)

  if (!response.ok) {
    throw new Error('Could not load meals')
  }

  const data = await response.json()
  return data.meals || []
}

export const getMeal = async (id) => {
  const meals = await getChickenMeals()
  return meals.find((meal) => meal.idMeal === String(id)) || null
}

export const getIngredients = (meal) => {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (name && name.trim()) {
      ingredients.push({ name, measure })
    }
  }

  return ingredients
}
