import Recipe from "../entity/Recipe.js";
import RecipeCard from "../components/RecipeCard.js";
import RecipesDictionary from "./RecipesDictionary.js";

class RecipesManager {
  #recipesEntities = [];
  #recipesEntitiesTemp = [];
  #lastSearch = "";
  #tags = {};
  #filterTags = [];
  #dictionary;

  constructor(recipesList) {
    this.setRecipesEntities(recipesList);
    this.setTags(this.getRecipesEntities());
    this.renderRecipes(this.getRecipesEntities());
    this.#dictionary = new RecipesDictionary(this.getRecipesEntities());
  }

  setRecipesEntities(recipesList) {
    recipesList.forEach((recipe) => {
      this.#recipesEntities.push(new Recipe(recipe));
    });
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

  setRecipesEntitiesTemp() {
    this.#recipesEntitiesTemp = this.getRecipesEntities();
  }

  setTags(recipesList) {
    this.#tags.appareil = new Set();
    this.#tags.ustensiles = new Set();
    this.#tags.ingredients = new Set();

    for (let recipe of recipesList) {
      this.#tags.appareil.add(recipe.getAppliance().replace(/\./g, "").toLowerCase());
      for (let ustensil of recipe.getUstensils()) {
        this.#tags.ustensiles.add(ustensil.replace(/\./g, "").toLowerCase());
      }
      for (let ingredient of recipe.getIngredients()) {
        this.#tags.ingredients.add(ingredient.ingredient.replace(/\./g, "").toLowerCase());
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
      this.#recipesEntitiesTemp = this.getRecipesEntities();
      this.filterEntities(this.getLastSearch());
      this.setTags(this.getRecipesEntities());
      this.getFiltersTag().forEach((tag) => {
        this.filterEntities(tag, true, true);
      });
      this.renderRecipes(this.getRecipesEntities(this.noResults()));
    } else if (this.getFiltersTag().length && this.getLastSearch().length < 3) {
      this.emptyRecipesEntitiesTemp();
      this.#recipesEntitiesTemp = this.getRecipesEntities();
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
    this.#lastSearch = '';
  }

  emptyRecipesEntitiesTemp() {
    this.#recipesEntitiesTemp = [];
  }

  filterEntities(filter, byTag = false, searchLoop = false) {
    let lastRecipesArray = this.#recipesEntitiesTemp;
    let listToUse =
      (this.#recipesEntitiesTemp.length &&
        (filter.length > this.#lastSearch.length ||
          (filter.length >= this.#lastSearch.length && this.#filterTags.length) ||
          (this.#lastSearch.length && byTag))) ||
      searchLoop
        ? this.#recipesEntitiesTemp
        : this.#recipesEntities;
    if (!byTag) {
      let formatFilter = this.#dictionary.formatKey(filter).trim();
      let dictionary = this.#dictionary.getDictionary();
      formatFilter = formatFilter.split(" ")

      for (let i = 0; i < formatFilter.length; i++) {
        if(dictionary.hasOwnProperty(formatFilter[i])){
          if (i === 1) {
            listToUse = this.#recipesEntitiesTemp;
          }
          this.#recipesEntitiesTemp = listToUse.filter((recipe) => {
            return (
              dictionary[formatFilter[i]].has(recipe.getId()) 
            );
          });
        } else {
          return this.#recipesEntitiesTemp = [];
        }
      }
      
      this.#lastSearch = filter;
      if (
        this.getFiltersTag().length &&
        (filter.length <= this.#lastSearch.length || !lastRecipesArray.length)
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
                  recipe.ingredient.replace(/\./g, "").toLowerCase().indexOf(filter.value) >= 0
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
                  ustensile.replace(/\./g, "").toLowerCase().indexOf(filter.value) >= 0
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
