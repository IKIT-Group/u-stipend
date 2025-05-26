import Header from "./Header.js";
import Popup from "./Popup.js";
import "./direction.js";
import "./schoolarships.js";

new Header();
new Popup();

const titlesElement = document.querySelector("[data-js-result-titles]");
const listElement = document.querySelector("[data-js-result-list]");
const outputElement = document.querySelector("[data-js-result-output]");

const form = document.querySelector(".calculator__form");
const placeholder = document.getElementById("resultPlaceholder");

function clearInputs(container) {
  const inputs = container.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    if (input.type === "checkbox" || input.type === "radio") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    titlesElement.classList.remove("visually-hidden");
    listElement.classList.remove("visually-hidden");
    outputElement.classList.remove("visually-hidden");
  });
});

const studentButton = document.getElementById("student");
const applicantButton = document.getElementById("applicant");
const applicantBlock = document.querySelector("[data-js-applicant-block]");
const studentBlock = document.querySelector("[data-js-student-block]");
const evaluationsBlock = document.querySelector(
  "[data-js-student-evaluations]"
);
const additionallyBlock = document.querySelector(
  "[data-js-student-additionally]"
);

/**
 * Короче внизу я написал костыльное решение, которое позволяет использовать атрибут reqired без заполнения полей
 * на других элементах формы для какого-то другого статуса
 */

const courseNumberElement = document.getElementById("course-number");
const directionElement = document.getElementById("direction");
const basisOfLearningElement = document.getElementById("basis-of-learning");
const evaluationsElement = document.getElementById("evaluations");
const amountOfPointsElement = document.getElementById("amountOfPoints");
const directionOfApplicantElement = document.getElementById(
  "directionOfApplicant"
);
const basisOfLearningApplicantElement = document.getElementById(
  "basis-of-learning-applicant"
);

courseNumberElement.required = true;
directionElement.required = true;
basisOfLearningElement.required = true;
evaluationsElement.required = true;

const resetResults = () => {
  titlesElement.classList.add("visually-hidden");
  listElement.classList.add("visually-hidden");
  outputElement.classList.add("visually-hidden");
  placeholder.style.display = "block";

  // Очищаем все поля ввода в форме
  clearInputs(form);

  // Сбрасываем форму
  form.reset();
};

const submitButton = document.querySelector("[data-js-submit-button]")

applicantButton.addEventListener("click", () => {
  applicantBlock.classList.remove("visually-hidden");
  studentBlock.classList.add("visually-hidden");
  evaluationsBlock.classList.add("visually-hidden");
  additionallyBlock.classList.add("visually-hidden");
  applicantButton.classList.add("is-active");
  studentButton.classList.remove("is-active");
  courseNumberElement.required = false;
  directionElement.required = false;
  basisOfLearningElement.required = false;
  evaluationsElement.required = false;
  placeholder.textContent = "Введите данные для получения информации..."
  // submitButton.style.cursor = "not-allowed";
  // submitButton.style.opacity = "0.5";
  // submitButton.disabled = true;

  resetResults();
});

studentButton.addEventListener("click", () => {
  applicantBlock.classList.add("visually-hidden");
  studentBlock.classList.remove("visually-hidden");
  evaluationsBlock.classList.remove("visually-hidden");
  additionallyBlock.classList.remove("visually-hidden");
  applicantButton.classList.remove("is-active");
  studentButton.classList.add("is-active");
  courseNumberElement.required = true;
  directionElement.required = true;
  basisOfLearningElement.required = true;
  evaluationsElement.required = true;

  placeholder.textContent = "Введите данные для получения информации..."
  // submitButton.style.cursor = "pointer";
  // submitButton.style.opacity = "1";
  // submitButton.disabled = false;

  resetResults();
});
