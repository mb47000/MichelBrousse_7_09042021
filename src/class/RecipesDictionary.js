class RecipesDictionary {
  #dictionary = {};

  constructor(recipesList) {
    this.createDictionary(recipesList);
  }

  getDictionary() {
    return this.#dictionary;
  } 

  createDictionary(recipesList) {
    for (let recipe of recipesList) {
      let ingredients = [];
      for (let ingredient of recipe.getIngredients()) {
        ingredients.push(ingredient.ingredient);
      }

      let currentRecipe = `${recipe.getName()} ${recipe.getDescription()} ${ingredients.join(
        " "
      )}`;

      let currentRecipeArray = this.formatKey(currentRecipe).split(" ");

      for (let keyword of currentRecipeArray) {
        let keywordHash = [];
        for (let i = 0; i <= keyword.length; i++) {
          keywordHash.push(keyword.substring(0, i));
        }

        for (let key of keywordHash) {
          let formatedKey = key.trim();
          if (formatedKey) {
            if (this.#dictionary.hasOwnProperty(formatedKey)) {
              this.#dictionary[formatedKey].add(recipe.getId());
            } else {
              this.#dictionary[formatedKey] = new Set();
              this.#dictionary[formatedKey].add(recipe.getId());
            }
          }
        }
      }
    }
  }

  formatKey(string) {
    return string
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .replace(/[']/g, "")
      .replace(/[\d]/g, "")
      .replace(/[àäâ]/g, "a")
      .replace(/[ç]/g, "c")
      .replace(/[éèêë]/g, "e")
      .replace(/[îï]/g, "i")
      .replace(/[ôö]/g, "o")
      .replace(/[ùûû]/g, "u");
  }
}

export default RecipesDictionary;
