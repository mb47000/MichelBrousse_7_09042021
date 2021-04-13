class Tag {
  /**
   * DOM element <button> for modal opening
   * @type {HTMLElement}
   */
  buttonTag;

  constructor(color, name) {
    this.createButtonTag(color, name);
  }

  createButtonTag = (color, name) => {
    this.buttonTag = document.createElement("button");
    this.buttonTag.className = `filter-tag-${color}`;
    this.buttonTag.innerHTML = `<span>${name}</span> <i class="far fa-times-circle"></i>`;
    this.buttonTag.onclick = () => {
      this.buttonTag.remove();
    };
  };

  static tagExists = (currentTag) => {
    let tagsList = document.querySelectorAll("[class^=filter-tag]");
    let isTagExists = false;
    tagsList.forEach((tag) => {
      if (tag.children[0].innerHTML == currentTag) {
        isTagExists = true;
      }
    });
    return isTagExists;
  };
}

export default Tag;
