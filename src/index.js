import recipes from "./data/recipes.js";
import Dropdown from "./components/Dropdown.js";

<<<<<<< HEAD
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
    return tag.toLowerCase().indexOf(filter) === 0;
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
=======
const appliances = new Set();
recipes.map((recipe) => {
  appliances.add(recipe.appliance.replace(/\./g, ""));
});

const ustensils = new Set();
for (let recipe of recipes) {
  for (let ustensil of recipe.ustensils) {
    ustensils.add(ustensil);
  }
}

const ingredients = new Set();
for (let recipe of recipes) {
  for (let ingredient of recipe.ingredients) {
    ingredients.add(
      ingredient.ingredient
    );
  }
}

const dropdown = {
  blue: new Dropdown(".filter-container", "Ingredients", "blue", ingredients),
  green: new Dropdown(".filter-container", "Appareil", "green", appliances),
  red: new Dropdown(".filter-container", "Ustensiles", "red", ustensils),
};
>>>>>>> main
