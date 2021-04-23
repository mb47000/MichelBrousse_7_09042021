import Recipe from "../entity/Recipe.js";
import RecipeCard from "../components/RecipeCard.js";

class RecipesManager {
  #recipesEntities = [];

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
    return this.#recipesEntities;
  }
  
  renderRecipes(recipesList) {
    recipesList.forEach((recipe) => {
        RecipeCard(recipe);
    })
  }
}

export default RecipesManager;
