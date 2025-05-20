import Header from "./Header.js";
import Popup from "./Popup.js";
import "./direction.js"
import "./schoolarships.js"

new Header();
new Popup();

document.addEventListener("DOMContentLoaded", function () {
  const titlesElement = document.querySelector("[data-js-result-titles]")
  const listElement = document.querySelector("[data-js-result-list]")
  const outputElement = document.querySelector("[data-js-result-output]")

  const form = document.querySelector(".calculator__form");
  const placeholder = document.getElementById("resultPlaceholder");


  form.addEventListener("submit", function (e) {
    e.preventDefault();
    placeholder.style.display = "none";
    titlesElement.classList.remove('visually-hidden')
    listElement.classList.remove('visually-hidden')
    outputElement.classList.remove('visually-hidden')
  });
});

const studentButton = document.getElementById("student")
const applicantButton = document.getElementById("applicant")
const applicantBlock = document.querySelector("[data-js-applicant-block]")
const studentBlock = document.querySelector("[data-js-student-block]")
const evaluationsBlock = document.querySelector("[data-js-student-evaluations]")
const additionallyBlock = document.querySelector("[data-js-student-additionally]")

applicantButton.addEventListener("click", () => {
  applicantBlock.classList.remove("visually-hidden")
  studentBlock.classList.add("visually-hidden")
  evaluationsBlock.classList.add("visually-hidden")
  additionallyBlock.classList.add("visually-hidden")
  applicantButton.classList.add("is-active")
  studentButton.classList.remove("is-active")
})

studentButton.addEventListener("click", () => {
  applicantBlock.classList.add("visually-hidden")
  studentBlock.classList.remove("visually-hidden")
  evaluationsBlock.classList.remove("visually-hidden")
  additionallyBlock.classList.remove("visually-hidden")
  applicantButton.classList.remove("is-active")
  studentButton.classList.add("is-active")
})






