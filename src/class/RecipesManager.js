import Recipe from "../entity/Recipe.js";
import RecipeCard from "../components/RecipeCard.js";

class RecipesManager {
  #recipesEntities = [];
  #recipesEntitiesTemp = [];
  #lastSearch = "";
  #tags = {};
  #filterTags = [];

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

  setRecipesEntitiesTemp() {
    this.#recipesEntitiesTemp = this.getRecipesEntities();
  }

  noResults() {
    return this.#recipesEntitiesTemp.length ? false : true;
  }

  getRecipesEntities(noResults = false) {
    if (noResults) {
      return "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
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

  addFilterTags(tag) {
    if (this.getFiltersTag().length || this.getLastSearch().length >= 3) this.filterEntities(tag, true, true);
    else this.filterEntities(tag, true);
    this.renderRecipes(this.getRecipesEntities(this.noResults()));
  }

  removeFilterTags(tag) {
    this.getFiltersTag().splice(
      this.getFiltersTag().findIndex((iTag) => iTag.value === tag),
      1
    );
    if (!this.getFiltersTag().length && this.getLastSearch().length < 3) {
      this.emptyRecipesEntitiesTemp();
      this.renderRecipes(this.getRecipesEntities());
      this.setTags(this.getRecipesEntities());
    } else if (
      !this.getFiltersTag().length &&
      this.getLastSearch().length >= 3
    ) {
      this.emptyRecipesEntitiesTemp();
      this.filterEntities(this.getLastSearch());
      this.renderRecipes(this.getRecipesEntities(this.noResults()));
      this.setTags(this.getRecipesEntities());
    } else if (
      this.getFiltersTag().length &&
      this.getLastSearch().length >= 3
    ) {
      this.emptyRecipesEntitiesTemp();
      this.setRecipesEntitiesTemp();
      this.filterEntities(this.getLastSearch());
      this.setTags(this.getRecipesEntities());
      this.getFiltersTag().forEach((tag) => {
        this.filterEntities(tag, true, true);
      });
      this.renderRecipes(this.getRecipesEntities(this.noResults()));
    } else if (this.getFiltersTag().length && this.getLastSearch().length < 3) {
      this.emptyRecipesEntitiesTemp();
      this.setRecipesEntitiesTemp();
      this.getFiltersTag().forEach((tag) => {
        this.filterEntities(tag, true, true);
      });
      this.renderRecipes(this.getRecipesEntities(this.noResults()));
      this.setTags(this.getRecipesEntities());
    }
  }

  getFiltersTag() {
    return this.#filterTags;
  }

  getLastSearch() {
    return this.#lastSearch;
  }

  resetLastSearch() {
    this.#lastSearch = "";
  }

  emptyRecipesEntitiesTemp() {
    this.#recipesEntitiesTemp = [];
  }

  filterEntities(filter, byTag = false, searchLoop = false) {
    let lastRecipesArray = this.#recipesEntitiesTemp;
    let listToUse =
      (this.#recipesEntitiesTemp.length &&
        (filter.length > this.#lastSearch.length ||
          this.#filterTags.length ||
          (this.#lastSearch.length && byTag))) ||
      searchLoop
        ? this.#recipesEntitiesTemp
        : this.#recipesEntities;
    if (!byTag) {
      this.#recipesEntitiesTemp = listToUse.filter((recipe) => {
        return (
          recipe.getName().toLowerCase().indexOf(filter) >= 0 ||
          recipe.getDescription().toLowerCase().indexOf(filter) >= 0 ||
          recipe
            .getIngredients()
            .some(
              (recipe) => recipe.ingredient.toLowerCase().indexOf(filter) >= 0
            )
        );
      });
      this.#lastSearch = filter;
      if (
        this.getFiltersTag().length &&
        (filter.length < this.#lastSearch.length || !lastRecipesArray.length)
      ) {
        this.getFiltersTag().forEach((tag) => {
          this.filterEntities(tag, true, true);
        });
      }
    } else {
      this.#recipesEntitiesTemp = listToUse.filter((recipe) => {
        switch (filter.tagCategory) {
          case "ingredients":
            return recipe
              .getIngredients()
              .some(
                (recipe) =>
                  recipe.ingredient.toLowerCase().indexOf(filter.value) >= 0
              );
          case "appareil":
            return (
              recipe
                .getAppliance()
                .replace(/\./g, "")
                .toLowerCase()
                .indexOf(filter.value) >= 0
            );
          case "ustensiles":
            return recipe
              .getUstensils()
              .some(
                (ustensile) =>
                  ustensile.toLowerCase().indexOf(filter.value) >= 0
              );
        }
      });
      if (!this.getFiltersTag().some((tag) => tag.value === filter.value)) {
        this.#filterTags.push({
          value: filter.value,
          tagCategory: filter.tagCategory,
        });
      }
    }
    this.setTags(this.getRecipesEntities());
  }

  renderRecipes(recipesList) {
    let cardContainer = document.querySelector(".cards-container");
    cardContainer.innerHTML = "";

    if (typeof recipesList !== "object") {
      cardContainer.innerHTML = recipesList;
    } else {
      recipesList.forEach((recipe) => {
        RecipeCard(recipe);
      });
    }
  }
}

export default RecipesManager;
