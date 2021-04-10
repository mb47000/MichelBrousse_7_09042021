import recipes from "./data/recipes.js";
import Dropdown from "./components/Dropdown.js";


const dropdown = {
  blue: new Dropdown(".filter-container", "Ingredients", "blue"),
  green: new Dropdown(".filter-container", "Appareil", "green"),
  red: new Dropdown(".filter-container", "Ustensiles", "red"),
};
