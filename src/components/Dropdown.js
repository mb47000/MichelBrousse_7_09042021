class Dropdown {
<<<<<<< HEAD
  /**
   * DOM element <button> for modal opening
=======
  
  /**
   *  DOM element <button> for modal opening
>>>>>>> main
   * @type {HTMLElement}
   */
  button;

  /**
<<<<<<< HEAD
   * DOM element <div> who contains the input filter for the tags and the list <ul> of tags
=======
   *  DOM element <div> who contains the input filter for the tags and the list of tags
>>>>>>> main
   * @type {HTMLElement}
   */
  dropdown;

  /**
<<<<<<< HEAD
   * [CustomEvent description]
   *
   * @param   {[type]}  tagFilterChange  [tagFilterChange description]
   *
   */
  inputChangeEvent = new CustomEvent("onTagFilterChange", {
    detail: { dropdown: {color: '', data: ''} },
  });

  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  Dom element to inject
   * @param   {String}  title       title of dropdown, use for button innerHTML and input placeholder
   * @param   {String}  color       color theme of the dropdown avaible (blue, green or red) in scss component/_dropdown.scss
=======
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   * @param   {String}  title       [title description]
   * @param   {String}  color       [color theme of the dropdown]
>>>>>>> main
   * @constructor
   */
  constructor(domTarget, title, color, tags) {
    this.createOpenButton(title, color);
    this.createDropdown(title, color, tags);
    this.render(domTarget, this.fullDropdown());
<<<<<<< HEAD
    this.inputChangeEvent.detail.dropdown.color = color;
    this.inputChangeEvent.detail.dropdown.data = title;
=======
>>>>>>> main
  }

  /**
   * [fullDropdown description]
   *
   * @return  {HTMLElement}  [return description]
<<<<<<< HEAD
   *
=======
   * 
>>>>>>> main
   */
  fullDropdown = () => {
    let component = document.createElement("div");
    component.appendChild(this.button);
    component.appendChild(this.dropdown);
    return component;
  };

<<<<<<< HEAD
  dropdownSize = (tagsList) => {
    let copyTagList = [...tagsList]
    let colSize =
      copyTagList.length <= 10
        ? 1
        : copyTagList.length <= 20
        ? 2
        : copyTagList.length <= 30
        ? 3
        : 4;

    let height =
      copyTagList.length > 40
        ? `${Math.ceil(copyTagList.length / 4) * 34 + 34}px`
        : "350px";
    this.dropdownList.style.maxHeight = height;
    this.dropdownList.className = `dropdown-list col-${colSize}`;
    this.dropdownInputContainer.className = `dropdown-search col-${colSize}`;
  };

  /**
   * [createOpenButton description]
   *
   * @param   {[type]}  title  [title description]
   * @param   {[type]}  color  [color description]
   *
   */
=======
>>>>>>> main
  createOpenButton = (title, color) => {
    this.button = document.createElement("button");
    this.button.className = `filter-button-${color}`;
    this.button.innerHTML = `${title} <i class="fas fa-chevron-down"></i>`;
    this.button.onclick = () => this.openDropdown();
  };

  createTagList = (tags) => {
<<<<<<< HEAD
   if (this.dropdownList.innerHTML !== '') this.dropdownList.innerHTML = '';

    tags.forEach((tag) => {
=======
    tags.forEach(tag => {
>>>>>>> main
      let tagElement = document.createElement("li");
      tagElement.innerHTML = tag;
      this.dropdownList.appendChild(tagElement);
    });
<<<<<<< HEAD
  };
=======
  }

  dropdownSize = (tagsList) => {
    let dropdownSize = {}
    dropdownSize.colSize = tagsList.size <= 10 ? 1 : tagsList.size <= 20 ? 2 : tagsList.size <= 30 ? 3 : 4;
    dropdownSize.height = tagsList.size > 40 ? `${Math.ceil(tagsList.size / 4) * 34}px` : '350px';
    this.dropdownList.style.maxHeight = dropdownSize.height;
    return dropdownSize;
  }
>>>>>>> main

  createDropdown = (title, color, tags) => {
    this.dropdown = document.createElement("div");
    this.dropdown.className = `dropdown dropdown-${color}`;
<<<<<<< HEAD

    this.dropdownList = document.createElement("ul");
    this.createTagList(tags);
=======
    
    this.dropdownList = document.createElement("ul");
    this.createTagList(tags);
    
    let dropdownSize = this.dropdownSize(tags);
    this.dropdownList.className = `dropdown-list col-${dropdownSize.colSize}`;
>>>>>>> main

    const closeDropdownButton = document.createElement("i");
    closeDropdownButton.className = "fas fa-chevron-up";
    closeDropdownButton.onclick = () => this.closeDropdown();

<<<<<<< HEAD
    this.dropdownInputContainer = document.createElement("div");

    this.inputSearch = document.createElement("input");
    this.inputSearch.type = "text";
    this.inputSearch.className = "tag-filter-input";
    this.inputSearch.placeholder = title;
    this.inputSearch.oninput = () => {
      this.inputSearch.dispatchEvent(this.inputChangeEvent);
    };

    this.dropdownInputContainer.appendChild(this.inputSearch);
    this.dropdownInputContainer.appendChild(closeDropdownButton);

    this.dropdownSize(tags);

    this.dropdown.appendChild(this.dropdownInputContainer);
=======
    /**
     * TODO : Refactor like dropdownList => this.dropdown... and add colSize modification in dropdownSize method
     */
    const dropdownInputContainer = document.createElement("div");
    dropdownInputContainer.className = `dropdown-search col-${dropdownSize.colSize}`;
    dropdownInputContainer.innerHTML = `<input type="text" placeholder="${title}" />`;
    dropdownInputContainer.appendChild(closeDropdownButton);

    this.dropdown.appendChild(dropdownInputContainer);
>>>>>>> main
    this.dropdown.append(this.dropdownList);
  };

  openDropdown = () => {
    let dropdownList = document.querySelectorAll(".dropdown");
    let buttonList = document.querySelectorAll("[class^=filter-button]");

    buttonList.forEach((button) => {
      if (button !== this.button) {
        button.style.display = "flex";
      }
    });

    dropdownList.forEach((dropdown) => {
      if (dropdown !== this.dropdown) {
        dropdown.style.display = "none";
      }
    });

    this.button.style.display = "none";
    this.dropdown.style.display = "block";
  };

  closeDropdown = () => {
    this.button.style.display = "flex";
    this.dropdown.style.display = "none";
  };

<<<<<<< HEAD
  updateTagList = (tags) => {
    this.createTagList(tags);
    this.dropdownSize(tags)
  }

=======
>>>>>>> main
  render(domTarget, component) {
    document.querySelector(domTarget).appendChild(component);
  }
}

export default Dropdown;
