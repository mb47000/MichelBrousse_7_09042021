import Recipe from "../entity/Recipe.js";
import RecipeCard from "../components/RecipeCard.js";

class RecipesManager {
  #recipesEntities = [];
  #recipesEntitiesTemp = [];

  constructor(recipesList) {
    this.setRecipesEntities(recipesList);
    this.renderRecipes(this.getRecipesEntities());
  }

  setRecipesEntities(recipesList) {
    recipesList.forEach((recipe) => {
      this.#recipesEntities.push(new Recipe(recipe));
    });
  }

  getRecipesEntities() {
    if (this.#recipesEntitiesTemp.length) {
      return this.#recipesEntitiesTemp;
    } else {
      return this.#recipesEntities;
    }
    
  }

  filterEntities(filter) {
    if (this.#recipesEntitiesTemp.length) {
      console.log(filter);
    } else {
      this.#recipesEntitiesTemp = [...this.#recipesEntities].filter((recipe) => {
        return recipe.getName().toLowerCase().indexOf(filter) >= 0;
      });
      this.renderRecipes(this.getRecipesEntities());
    }
  }

  renderRecipes(recipesList) {
    recipesList.forEach((recipe) => {
      RecipeCard(recipe);
    });
  }
}

export default RecipesManager;
