const searchButton = document.querySelector('.getRecipe')
const form = document.querySelector('form.search')
const searchResults = document.querySelector('.results')
const baseEndpoint = 'http://www.recipepuppy.com/api'






async function fetchRecipes(query) {
  const res = await fetch(`${baseEndpoint}?q=${query}`)
  console.log(res)
  const data = await res.json()
  return data
  
}

async function handleSubmit(e) {
    e.preventDefault()
    const el = e.currentTarget
    console.log(form.query.value)
    // turn the form off
   el.submit.disabled = true
   // submit the search 
    const recipes = await fetchRecipes(el.query.value)
    console.log(recipes)
    // turn the form on 
    el.submit.disabled = false
    displayRecipes(recipes.results)
}

function displayRecipes(recipes) {
    console.log('creating html')
    searchResults.style.opacity = 1
    const html = recipes.map(
        recipe => `<div class="recipe">
          <h2>${recipe.title}</h2>
          <p>${recipe.ingredients}</p>
          ${recipe.thumbnail &&
            `<img src="${recipe.thumbnail}" alt="${recipe.title}"/>`}
          <a href="${recipe.href}">View Recipe →</a>
        </div>`
      );
      searchResults.innerHTML = html.join('');
    }



// Event listeners

form.addEventListener('submit', handleSubmit)