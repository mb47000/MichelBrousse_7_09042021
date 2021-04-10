import recipes from "./data/recipes.js";
import Dropdown from "./components/Dropdown.js";

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
