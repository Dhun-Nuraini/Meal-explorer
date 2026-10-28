const apiUrl = 'https://www.themealdb.com/api/json/v1/1'

export async function searchMeals(query) {
  const response = await fetch(`${apiUrl}/search.php?s=${encodeURIComponent(query)}`)

  if (!response.ok) {
    throw new Error('Could not load meals')
  }

  const data = await response.json()
  return data.meals || []
}

export async function getMeal(id) {
  const response = await fetch(`${apiUrl}/lookup.php?i=${id}`)

  if (!response.ok) {
    throw new Error('Could not load this recipe')
  }

  const data = await response.json()
  return data.meals ? data.meals[0] : null
}

export function getIngredients(meal) {
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
