class Dropdown {
  
  /**
   *  DOM element <button> for modal opening
   * @type {HTMLElement}
   */
  button;

  /**
   *  DOM element <div> who contains the input filter for the tags and the list of tags
   * @type {HTMLElement}
   */
  dropdown;

  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   * @param   {String}  title       [title description]
   * @param   {String}  color       [color theme of the dropdown]
   * @constructor
   */
  constructor(domTarget, title, color, tags) {
    this.createOpenButton(title, color);
    this.createDropdown(title, color, tags);
    this.render(domTarget, this.fullDropdown());
  }

  /**
   * [fullDropdown description]
   *
   * @return  {HTMLElement}  [return description]
   * 
   */
  fullDropdown = () => {
    let component = document.createElement("div");
    component.appendChild(this.button);
    component.appendChild(this.dropdown);
    return component;
  };

  createOpenButton = (title, color) => {
    this.button = document.createElement("button");
    this.button.className = `filter-button-${color}`;
    this.button.innerHTML = `${title} <i class="fas fa-chevron-down"></i>`;
    this.button.onclick = () => this.openDropdown();
  };

  createTagList = (tags) => {
    tags.forEach(tag => {
      let tagElement = document.createElement("li");
      tagElement.innerHTML = tag;
      this.dropdownList.appendChild(tagElement);
    });
  }

  dropdownSize = (tagsList) => {
    let dropdownSize = {}
    dropdownSize.colSize = tagsList.size <= 10 ? 1 : tagsList.size <= 20 ? 2 : tagsList.size <= 30 ? 3 : 4;
    dropdownSize.height = tagsList.size > 40 ? `${Math.ceil(tagsList.size / 4) * 34}px` : '350px';
    this.dropdownList.style.maxHeight = dropdownSize.height;
    return dropdownSize;
  }

  createDropdown = (title, color, tags) => {
    this.dropdown = document.createElement("div");
    this.dropdown.className = `dropdown dropdown-${color}`;
    
    this.dropdownList = document.createElement("ul");
    this.createTagList(tags);
    
    let dropdownSize = this.dropdownSize(tags);
    this.dropdownList.className = `dropdown-list col-${dropdownSize.colSize}`;

    const closeDropdownButton = document.createElement("i");
    closeDropdownButton.className = "fas fa-chevron-up";
    closeDropdownButton.onclick = () => this.closeDropdown();

    /**
     * TODO : Refactor like dropdownList => this.dropdown... and add colSize modification in dropdownSize method
     */
    const dropdownInputContainer = document.createElement("div");
    dropdownInputContainer.className = `dropdown-search col-${dropdownSize.colSize}`;
    dropdownInputContainer.innerHTML = `<input type="text" placeholder="${title}" />`;
    dropdownInputContainer.appendChild(closeDropdownButton);

    this.dropdown.appendChild(dropdownInputContainer);
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

  render(domTarget, component) {
    document.querySelector(domTarget).appendChild(component);
  }
}

export default Dropdown;
