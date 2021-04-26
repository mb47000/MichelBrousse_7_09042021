import recipes from "./data/recipes.js";
import Dropdown from "./components/Dropdown.js";
import MainSearch from "./components/MainSearch.js";
import RecipeManager from "./class/RecipesManager.js"

const mainSearch = new MainSearch('.search-zone');
const recipesManager = new RecipeManager(recipes);
const data = recipesManager.getRecipesEntities();
const tagsList = recipesManager.getTags();

const filterTag = (data, filter) => {
  return [...data].filter((tag) => {
    return tag.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
  });
};


const dropdown = {
  blue: new Dropdown(
    ".filter-container",
    "Ingredients",
    "blue",
    tagsList.ingredients
  ),
  green: new Dropdown(".filter-container", "Appareil", "green", tagsList.appareil),
  red: new Dropdown(".filter-container", "Ustensiles", "red", tagsList.ustensiles),
};

document.addEventListener(
  "onTagFilterChange",
  (event) => {
    let targetDropdown = event.detail.dropdown;

    const List = filterTag(
      tagsList[targetDropdown.data.toLowerCase()],
      event.target.value.toLowerCase()
    );

    dropdown[targetDropdown.color].updateTagList(List);
  },
  true
);

document.addEventListener(
  "onAddTag",
  (event) => {
    console.log(event.target);
  },
  true
);

document.addEventListener(
  "onRemoveTag",
  (event) => {
    console.log(event.target);
  },
  true
);

document.addEventListener(
  "onMainSearchChange",
  (event) => {
    recipesManager.filterEntities(event.target.value.toLowerCase());
  },
  true
);

document.addEventListener(
  "onMainSearchReset",
  () => {
    recipesManager.emptyRecipesEntitiesTemp();
    recipesManager.renderRecipes(recipesManager.getRecipesEntities());
  },
  true
);