const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const recipesList = document.getElementById("recipesList");

searchBtn.addEventListener("click", fetchRecipes);

async function fetchRecipes() {
    recipesList.innerHTML = ""; // Clear previous search results
    const query = searchInput.value.trim();

    if (query === "") {
        return;
    }

    const apiKey = 'b95f297a2bmsh58d3dc30700f7cap1fd361jsn92eed1df6689'
    const apiUrl = `https://edamam-recipe-search.p.rapidapi.com/search?q=${query}`;

    const headers = {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'edamam-recipe-search.p.rapidapi.com'
    };

    try {
        const response = await axios.get(apiUrl, { headers });
        const data = response.data;

        if (data.hits.length === 0) {
            recipesList.innerHTML = "<p>No recipes found.</p>";
        } else {
            data.hits.forEach(hit => {
                const recipe = hit.recipe;
                const recipeItem = document.createElement("div");
                recipeItem.className = "recipe-item";
                recipeItem.innerHTML = `
                    <h2>${recipe.label}</h2>
                    <p>Calories: ${recipe.calories.toFixed(2)}</p>
                    <p><a href="${recipe.url}" target="_blank">View Recipe</a></p>
                `;
                recipesList.appendChild(recipeItem);
            });
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipesList.innerHTML = "<p>An error occurred while fetching recipes.</p>";
    }
}
