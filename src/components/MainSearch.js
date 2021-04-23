class MainSearch {
  /**
   * DOM element <input> for main search
   * @type {HTMLElement}
   */
  mainSearch;

  /**
   * [CustomEvent description]
   *
   */
  inputChangeEvent = new CustomEvent("onMainSearchChange");

  constructor(domTarget) {
    this.createMainSearch(domTarget);
  }

  createMainSearch = (domTarget) => {
    let searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";
    this.mainSearch = document.createElement("input");
    this.mainSearch.type = "text";
    this.mainSearch.placeholder = `Rechercher un ingrédient, appareil, ustensile ou une recette`;
    this.mainSearch.oninput = (event) => {
      if (event.target.value.length >= 3) {
        this.mainSearch.dispatchEvent(this.inputChangeEvent);
      }
    };
    document.querySelector(domTarget).appendChild(this.mainSearch);
    document.querySelector(domTarget).appendChild(searchIcon);
  };
}

export default MainSearch;
