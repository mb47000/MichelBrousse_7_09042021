class Dropdown {
  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  [domTarget description]
   * @param   {String}  title       [title description]
   * @param   {String}  color       [color of the dropdown]
   * @constructor
   */
  constructor(domTarget, title, color) {
    this.createOpenButton(title, color);
    this.createDropdown(title, color);
    this.render(domTarget, this.fullDropdown());
  }

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

  createDropdown = (title, color) => {
    const closeDropdownButton = document.createElement("i");
    closeDropdownButton.className = "fas fa-chevron-up";
    closeDropdownButton.onclick = () => this.closeDropdown();

    const dropdownInputContainer = document.createElement("div");
    dropdownInputContainer.className = "dropdown-search col-3";
    dropdownInputContainer.innerHTML = `<input type="text" placeholder="${title}" />`;
    dropdownInputContainer.appendChild(closeDropdownButton);

    const dropdownList = document.createElement("ul");
    dropdownList.className = "dropdown-list col-3";
    dropdownList.innerHTML = `<li>Ail</li> <li>Ananas</li><li>Banane</li><li>Basilic</li><li>Beurre</li><li>Beurre fondu</li><li>Beurre salé</li><li>Bicarbonate</li><li>Blanc de dinde</li><li>Boudoirs</li><li>Carotte</li><li>Champignons de paris</li><li>Chocolat</li><li>Chocolat au lait</li><li>Chocolat noir</li><li>Chocolat noir en pepites</li><li>Citron</li><li>Citron Vert</li><li>Concombre</li><li>Coulis de tomates</li><li>Courgette</li><li>Crème de coco</li><li>Crème fraîche</li><li>Crème liquide</li>`;

    this.dropdown = document.createElement("div");
    this.dropdown.className = `dropdown dropdown-${color}`;
    this.dropdown.appendChild(dropdownInputContainer);
    this.dropdown.append(dropdownList);
  };

  dropdownSearch() {}

  openDropdown = () => {
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
