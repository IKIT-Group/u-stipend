class Popup {
  selectors = {
    title: "[data-js-result-title]",
    popup: "[data-js-result-popup]",
  };

  stateClasses = {
    visuallyHidden: "visually-hidden",
  };

  constructor() {
    this.titleElement = document.querySelector(this.selectors.title);
    this.popupElement = document.querySelector(this.selectors.popup);
    this.bindEvents();
  }

  onPopupClick = () => {
    this.popupElement.classList.toggle(this.stateClasses.visuallyHidden);
  };

  onClosePopup = (e) => {
    const isClickInsidePopup = this.popupElement.contains(e.target);
    const isClickOnTitle = this.titleElement.contains(e.target);

    if (!isClickInsidePopup && !isClickOnTitle) {
      this.popupElement.classList.add(this.stateClasses.visuallyHidden);
    }
  };

  bindEvents() {
    this.titleElement.addEventListener("click", this.onPopupClick);
    document.addEventListener("click", this.onClosePopup);
  }
}

export default Popup;
