import Recipe from "../entity/Recipe.js";
import RecipeCard from "../components/RecipeCard.js";

class RecipesManager {
  #recipesEntities = [];
  #recipesEntitiesTemp = [];
  #lastSearch = '';
  #tags = {};

  constructor(recipesList) {
    this.setRecipesEntities(recipesList);
    this.setTags(this.getRecipesEntities());
    this.renderRecipes(this.getRecipesEntities());
  }

  setRecipesEntities(recipesList) {
    recipesList.forEach((recipe) => {
      this.#recipesEntities.push(new Recipe(recipe));
    });
  }

  getRecipesEntities(noResults = false) {
    if (noResults) {
      return 'pas de recette dans la liste';
    } else if (this.#recipesEntitiesTemp.length) {
      return this.#recipesEntitiesTemp;
    } else {
      return this.#recipesEntities;
    }
  }

  setTags(recipesList) {
    this.#tags.appareil = new Set();
    this.#tags.ustensiles = new Set();
    this.#tags.ingredients = new Set();

    for (let recipe of recipesList) {
      this.#tags.appareil.add(recipe.getAppliance().replace(/\./g, ""));
      for (let ustensil of recipe.getUstensils()) {
        this.#tags.ustensiles.add(ustensil);
      }
      for (let ingredient of recipe.getIngredients()) {
        this.#tags.ingredients.add(ingredient.ingredient);
      }
    }
  }

  getTags() {
    return this.#tags;
  }

  emptyRecipesEntitiesTemp() {
    this.#recipesEntitiesTemp = [];
  }


  filterEntities(filter) {
    let listToUse = this.#recipesEntitiesTemp.length && (filter.length > this.#lastSearch.length) ? this.#recipesEntitiesTemp : this.#recipesEntities;

    this.#recipesEntitiesTemp = listToUse.filter((recipe) => {
      return recipe.getName().toLowerCase().indexOf(filter) >= 0 || recipe.getDescription().toLowerCase().indexOf(filter) >= 0 || recipe.getIngredients().forEach(recipe => recipe.ingredient.toLowerCase().indexOf(filter) >= 0);
    });

    this.#lastSearch = filter;
    let noResults = this.#recipesEntitiesTemp.length ? false : true;
    this.renderRecipes(this.getRecipesEntities(noResults));
  }

  renderRecipes(recipesList) {
    let cardContainer = document.querySelector(".cards-container");
    cardContainer.innerHTML = '';

    if (typeof recipesList !== 'object') {
      cardContainer.innerHTML = recipesList;
    } else {
      recipesList.forEach((recipe) => {
        RecipeCard(recipe);
      });
    }

  }
}

export default RecipesManager;
