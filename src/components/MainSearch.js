class MainSearch {
  /**
   * DOM element <input> for main search
   * @type {HTMLElement}
   */
  #mainSearch;

  
  #lastInputLength = 0;

  /**
   * [CustomEvent description]
   *
   */
  inputChangeEvent = new CustomEvent("onMainSearchChange");
  inputResetEvent = new CustomEvent("onMainSearchReset");

  constructor(domTarget) {
    this.createMainSearch(domTarget);
  }

  createMainSearch = (domTarget) => {
    let searchIcon = document.createElement("i");
    searchIcon.className = "fas fa-search";
    this.#mainSearch = document.createElement("input");
    this.#mainSearch.type = "text";
    this.#mainSearch.placeholder = `Rechercher un ingrédient, appareil, ustensile ou une recette`;
    this.#mainSearch.oninput = (event) => {
    let inputLength = event.target.value.length;
      if (inputLength >= 3) {
        this.#mainSearch.dispatchEvent(this.inputChangeEvent);
      }
      
      if (this.#lastInputLength >= 3 && inputLength < 3) {
        this.#mainSearch.dispatchEvent(this.inputResetEvent);
      }

      this.#lastInputLength = inputLength;
    };
    document.querySelector(domTarget).appendChild(this.#mainSearch);
    document.querySelector(domTarget).appendChild(searchIcon);
  };
}

export default MainSearch;
