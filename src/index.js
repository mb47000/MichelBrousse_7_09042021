import recipes from "./data/recipes.js";
import Dropdown from "./components/Dropdown.js";
import MainSearch from "./components/MainSearch.js";
import RecipeManager from "./class/RecipesManager.js";

const mainSearch = new MainSearch(".search-zone");
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
  green: new Dropdown(
    ".filter-container",
    "Appareil",
    "green",
    tagsList.appareil
  ),
  red: new Dropdown(
    ".filter-container",
    "Ustensiles",
    "red",
    tagsList.ustensiles
  ),
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
    recipesManager.addFilterTags({
      value: event.target.innerHTML.toLowerCase(),
      tagCategory: event.detail.dropdown.data.toLowerCase(),
    });
    dropdown.blue.updateTagList(tagsList.ingredients);
    dropdown.green.updateTagList(tagsList.appareil);
    dropdown.red.updateTagList(tagsList.ustensiles);
  },
  true
);

document.addEventListener(
  "onRemoveTag",
  (event) => {
    recipesManager.removeFilterTags(
      event.target.firstChild.innerHTML.toLowerCase()
    );

    dropdown.blue.updateTagList(tagsList.ingredients);
    dropdown.green.updateTagList(tagsList.appareil);
    dropdown.red.updateTagList(tagsList.ustensiles);
  },
  true
);

document.addEventListener(
  "onMainSearchChange",
  (event) => {
    recipesManager.filterEntities(event.target.value.toLowerCase());
    dropdown.blue.updateTagList(tagsList.ingredients);
    dropdown.green.updateTagList(tagsList.appareil);
    dropdown.red.updateTagList(tagsList.ustensiles);
    recipesManager.renderRecipes(
      recipesManager.getRecipesEntities(recipesManager.noResults())
    );
  },
  true
);

document.addEventListener(
  "onMainSearchReset",
  () => {
    recipesManager.resetLastSearch();
    recipesManager.emptyRecipesEntitiesTemp();

    if (recipesManager.getFiltersTag().length) {
      recipesManager.setRecipesEntitiesTemp();
      recipesManager.getFiltersTag().forEach((tag) => {
        recipesManager.filterEntities(tag, true, true);
        recipesManager.renderRecipes(
          recipesManager.getRecipesEntities(recipesManager.noResults())
        );
      });
    } else {
      recipesManager.renderRecipes(
        recipesManager.getRecipesEntities()
      );
    }
    recipesManager.setTags(recipesManager.getRecipesEntities());
    dropdown.blue.updateTagList(tagsList.ingredients);
    dropdown.green.updateTagList(tagsList.appareil);
    dropdown.red.updateTagList(tagsList.ustensiles);
  },
  true
);
