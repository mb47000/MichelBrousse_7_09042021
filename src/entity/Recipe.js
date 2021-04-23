class Recipe {   
    #id;
    #name;
    #servings;
    #ingredients;
    #time;
    #description;
    #appliance;
    #ustensils;

    constructor(recipe) {
        this.setId(recipe.id);
        this.setName(recipe.name);
        this.setServings(recipe.servings);
        this.setIngredients(recipe.ingredients);
        this.setTime(recipe.time);
        this.setDescription(recipe.description);
        this.setAppliance(recipe.appliance);
        this.setUstensils(recipe.ustensils);
    }

	  getId() {
		return this.#id;
	}

	  setId(id) {
		this.#id = id;
	}

	  getName() {
		return this.#name;
	}

	  setName(name) {
		this.#name = name;
	}

	  getServings() {
		return this.#servings;
	}

	  setServings(servings) {
		this.#servings = servings;
	}

	  getIngredients() {
		return this.#ingredients;
	}

	  setIngredients(ingredients) {
		this.#ingredients = ingredients;
	}

	  getTime() {
		return this.#time;
	}

	  setTime(time) {
		this.#time = time;
	}

	  getDescription() {
		return this.#description;
	}

	  setDescription(description) {
		this.#description = description;
	}

	  getAppliance() {
		return this.#appliance;
	}

	  setAppliance(appliance) {
		this.#appliance = appliance;
	}

	  getUstensils() {
		return this.#ustensils;
	}

	  setUstensils(ustensils) {
		this.#ustensils = ustensils;
	}
}

export default Recipe;