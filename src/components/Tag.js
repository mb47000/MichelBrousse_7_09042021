class Tag {
  /**
   * DOM element <button> for modal opening
   * @type {HTMLElement}
   */
  buttonTag;

  /**
   * [CustomEvent description]
   *
   * @param   {[type]}  tagFilterChange  [tagFilterChange description]
   *
   */
   removeTagEvent = new CustomEvent("onRemoveTag");

  constructor(color, name) {
    this.createButtonTag(color, name);
  }

  createButtonTag = (color, name) => {
    this.buttonTag = document.createElement("button");
    this.buttonTag.className = `filter-tag-${color}`;
    this.buttonTag.innerHTML = `<span>${name}</span> <i class="far fa-times-circle"></i>`;
    this.buttonTag.onclick = () => {
      this.buttonTag.dispatchEvent(this.removeTagEvent);
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
