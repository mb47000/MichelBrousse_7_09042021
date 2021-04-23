import recipes from "./data/recipes.js";
import Dropdown from "./components/Dropdown.js";
import RecipeManager from "./class/RecipesManager.js"

const recipesManager = new RecipeManager(recipes);

const data = {};

data.appareil = new Set();
recipes.map((recipe) => {
  data.appareil.add(recipe.appliance.replace(/\./g, ""));
});

data.ustensiles = new Set();
for (let recipe of recipes) {
  for (let ustensil of recipe.ustensils) {
    data.ustensiles.add(ustensil);
  }
}

data.ingredients = new Set();
for (let recipe of recipes) {
  for (let ingredient of recipe.ingredients) {
    data.ingredients.add(ingredient.ingredient);
  }
}

const filterTag = (data, filter) => {
  return [...data].filter((tag) => {
    return tag.toLowerCase().indexOf(filter) >= 0;
  });
};

const dropdown = {
  blue: new Dropdown(
    ".filter-container",
    "Ingredients",
    "blue",
    data.ingredients
  ),
  green: new Dropdown(".filter-container", "Appareil", "green", data.appareil),
  red: new Dropdown(".filter-container", "Ustensiles", "red", data.ustensiles),
};

document.addEventListener(
  "onTagFilterChange",
  (event) => {
    let targetDropdown = event.detail.dropdown;

    const tags = filterTag(
      data[targetDropdown.data.toLowerCase()],
      event.target.value.toLowerCase()
    );
    
    dropdown[targetDropdown.color].updateTagList(tags);
  },
  true
);
