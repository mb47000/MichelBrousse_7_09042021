import Tag from "./Tag.js"

class Dropdown {
  /**
   * DOM element <button> for modal opening
   * @type {HTMLElement}
   */
  button;

  /**
   * DOM element <div> who contains the input filter for the tags and the list <ul> of tags
   * @type {HTMLElement}
   */
  dropdown;

  /**
   * [CustomEvent description]
   *
   * @param   {[type]}  tagFilterChange  [tagFilterChange description]
   *
   */
  inputChangeEvent = new CustomEvent("onTagFilterChange", {
    detail: { dropdown: {color: '', data: ''} },
  });

  /**
   * [CustomEvent description]
   *
   * @param   {[type]}  tagFilterChange  [tagFilterChange description]
   *
   */
   addTagEvent = new CustomEvent("onAddTag");

  /**
   * [constructor description]
   *
   * @param   {HTMLElement}  domTarget  Dom element to inject
   * @param   {String}  title       title of dropdown, use for button innerHTML and input placeholder
   * @param   {String}  color       color theme of the dropdown avaible (blue, green or red) in scss component/_dropdown.scss
   * @constructor
   */
  constructor(domTarget, title, color, tags) {
    this.createOpenButton(title, color);
    this.createDropdown(title, color, tags);
    this.render(domTarget, this.fullDropdown());
    this.inputChangeEvent.detail.dropdown.color = color;
    this.inputChangeEvent.detail.dropdown.data = title;
    this.color = color;
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
  createOpenButton = (title, color) => {
    this.button = document.createElement("button");
    this.button.className = `filter-button-${color}`;
    this.button.innerHTML = `${title} <i class="fas fa-chevron-down"></i>`;
    this.button.onclick = () => this.openDropdown();
  };

  createTagList = (tags) => {
   if (this.dropdownList.innerHTML !== '') this.dropdownList.innerHTML = '';

    tags.forEach((tag) => {
      let tagElement = document.createElement("li");
      tagElement.onclick = (event) => {
        let tagListContainer = document.querySelector('.filter-container-tag');
        if (!Tag.tagExists(event.target.innerHTML)) {
          let newTag = new Tag(this.color, event.target.innerHTML);
          tagListContainer.appendChild(newTag.buttonTag);
          tagElement.dispatchEvent(this.addTagEvent);
        } 
      }
      tagElement.innerHTML = tag;
      this.dropdownList.appendChild(tagElement);
    });
  };

  createDropdown = (title, color, tags) => {
    this.dropdown = document.createElement("div");
    this.dropdown.className = `dropdown dropdown-${color}`;

    this.dropdownList = document.createElement("ul");
    this.createTagList(tags);

    const closeDropdownButton = document.createElement("i");
    closeDropdownButton.className = "fas fa-chevron-up";
    closeDropdownButton.onclick = () => this.closeDropdown();

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

  updateTagList = (tags) => {
    this.createTagList(tags);
    this.dropdownSize(tags)
  }

  render(domTarget, component) {
    document.querySelector(domTarget).appendChild(component);
  }
}

export default Dropdown;
