import Header from "./Header.js";

new Header()

const resultTitle = document.getElementById("resultTitle")
const resultPopup = document.getElementById("resultPopup")

resultTitle.addEventListener("click", () => {
  resultPopup.classList.toggle("visually-hidden")
})