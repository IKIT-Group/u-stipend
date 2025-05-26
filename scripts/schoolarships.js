const SCHOLARSHIPS = [
  {
    name: "Государственная Академическая Стипендия",
    amountByEvaluation: {
      "<=244": 3340,
      "245-264": 12000,
      "265-300": 12000,
      "Еще нет оценок": 3340,
      "Тройки или долги": 0,
      Четверки: 3340,
      "Четверки и пятерки": 4170,
      Пятерки: 5000,
    },
    key: "base",
    condition: ({ basis, basisOfLearningApplicant }) =>
      basis === "budget" || basisOfLearningApplicant === "budget",
  },
  {
    name: "Повышенная Государственная Академическая стипендия",
    amountByEvaluation: {
      "<=244": 0,
      "245-264": 0,
      "265-300": 0,
      "Еще нет оценок": 0,
      "Тройки или долги": 0,
      Четверки: 12800,
      "Четверки и пятерки": 13630,
      Пятерки: 14460,
    },
    key: "advanced",
    condition: ({ basis, basisOfLearningApplicant }) =>
      basis === "budget" || basisOfLearningApplicant === "budget",
    needsDocuments: true,
  },
  {
    name: "Социальная стипендия",
    key: "social",
    condition: ({ basis, basisOfLearningApplicant }) =>
      basis === "budget" || basisOfLearningApplicant === "budget",
    amountByEvaluation: {
      "<=244": 4670,
      "245-264": 4670,
      "265-300": 4670,
      "Еще нет оценок": (formData) => (formData.isOrphan ? 7090 : 4670),
      "Тройки или долги": (formData) => (formData.isOrphan ? 7090 : 4670),
      Четверки: (formData) => (formData.isOrphan ? 13370 : 9520),
      "Четверки и пятерки": (formData) => (formData.isOrphan ? 13370 : 9520),
      Пятерки: (formData) => (formData.isOrphan ? 13370 : 9520),
    },
    needsDocuments: true,
  },
  {
    name: "Краевая выплата",
    amountByEvaluation: {
      "<=244": 0,
      "245-264": (formData) => (formData.directionOfApplicant === "highpoints" ? 0 : 6000),
      "265-300": 6000,
      "Еще нет оценок": 0,
      "Тройки или долги": 0,
      Четверки: 6000,
      "Четверки и пятерки": 6000,
      Пятерки: 6000,
    },
    key: "regional",
    condition: ({ basis, basisOfLearningApplicant, course }) => basis === "budget" && course <= 2 || basisOfLearningApplicant === "budget",
    needsDocuments: true,
  },
  {
    name: "Стипендия Правительства РФ",
    amountByEvaluation: {
      "<=244": 0,
      "245-264": 0,
      "265-300": 0,
      "Еще нет оценок": 0,
      "Тройки или долги": 0,
      Четверки: 7000,
      "Четверки и пятерки": 7000,
      Пятерки: 7000,
    },
    key: "gov",
    condition: [
      ({ direction }) => !direction.includes("09.03.03 Прикладная информатика"),
      ({ basis, basisOfLearningApplicant }) =>
        basis === "budget" || basisOfLearningApplicant === "budget",
    ],
    needsDocuments: true,
  },
  {
    name: "Стипендия Президента РФ",
    amountByEvaluation: {
      "<=244": 0,
      "245-264": 0,
      "265-300": 0,
      "Еще нет оценок": 0,
      "Тройки или долги": 0,
      Четверки: 10000,
      "Четверки и пятерки": 10000,
      Пятерки: 10000,
    },
    key: "president",
    condition: [
      ({ direction }) => !direction.includes("09.03.03 Прикладная информатика"),
      ({ basis, basisOfLearningApplicant }) =>
        basis === "budget" || basisOfLearningApplicant === "budget",
    ],
    needsDocuments: true,
  },
  {
    name: "Стипендия для студентов платной основы от ППОС СФУ",
    amount: 1000,
    key: "ppos",
    condition: ({ basis, basisOfLearningApplicant, isUnion }) => basis === "paying" && isUnion || basisOfLearningApplicant === "paying",
    needsDocuments: true,
  },
];

function updateScholarshipsResults(formData) {
  const resultList = document.querySelector("[data-js-result-list]");
  const resultOutput = document.querySelector("[data-js-result-output]");
  const guaranteedAmountElem = resultOutput.querySelector(
    ".result__total-amount"
  );
  const possibleAmountElem = resultOutput.querySelector(
    ".result__possible-amount"
  );

  const evaluationMap = {
    "<=244": "<=244",
    "245-264": "245-264",
    "265-300": "265-300",
    "Еще нет оценок": "Еще нет оценок",
    "Тройки или академическая задолженность": "Тройки или долги",
    Четверки: "Четверки",
    "Четверки и пятерки": "Четверки и пятерки",
    Пятерки: "Пятерки",
  };
  const evalKey =
    evaluationMap[formData.evaluations] ||
    formData.evaluations ||
    evaluationMap[formData.amountOfPoints] ||
    formData.amountOfPoints;

  let guaranteedSum = 0;
  let possibleSum = 0;

  const items = resultList.querySelectorAll(".result__item");

  items.forEach((item) => {
    const scholarshipName = item
      .querySelector(".result__name")
      .textContent.trim();
    const scholarshipData = SCHOLARSHIPS.find(
      (s) => s.name === scholarshipName
    );
    if (!scholarshipData) return;

    let conditionPassed = false;

    try {
      if (Array.isArray(scholarshipData.condition)) {
        conditionPassed = scholarshipData.condition.every((cond) =>
          cond(formData)
        );
      } else if (typeof scholarshipData.condition === "function") {
        conditionPassed = scholarshipData.condition(formData);
      }
    } catch (e) {
      conditionPassed = false;
    }

    const regionalMultiplier = 1.2;
    let amount = 0;

    if (scholarshipData.amountByEvaluation) {
      const amountOrFunc = scholarshipData.amountByEvaluation[evalKey];
      amount =
        typeof amountOrFunc === "function"
          ? amountOrFunc(formData) * regionalMultiplier
          : amountOrFunc * regionalMultiplier;
    } else if (scholarshipData.amount) {
      amount = scholarshipData.amount * regionalMultiplier;
    }

    const statusElem = item.querySelector(".result__status");
    statusElem.classList.remove(
      "result__status--success",
      "result__status--warning",
      "result__status--danger"
    );

    if (amount > 0 && conditionPassed) {
      if (scholarshipData.needsDocuments) {
        statusElem.classList.add("result__status--warning");
        possibleSum += amount;
      } else {
        statusElem.classList.add("result__status--success");
        guaranteedSum += amount;
        possibleSum += amount;
      }
    } else {
      statusElem.classList.add("result__status--danger");
    }

    const amountElem = item.querySelector(".result__amount");
    amountElem.textContent = conditionPassed
      ? amount.toLocaleString("ru-RU") + " ₽"
      : "0 ₽";
  });

  if (formData.isUnion) {
    guaranteedSum *= 0.97;
    possibleSum *= 0.97;
  }

  guaranteedAmountElem.textContent =
    guaranteedSum.toLocaleString("ru-RU") + " ₽";
  possibleAmountElem.textContent = possibleSum.toLocaleString("ru-RU") + " ₽";

  resultList.classList.remove("visually-hidden");
  resultOutput.classList.remove("visually-hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".calculator__form");
  const studentButton = form.querySelector("#student");
  const applicantButton = form.querySelector("#applicant");

  form.addEventListener("submit", (event) => {
    const placeholder = document.getElementById("resultPlaceholder");
    placeholder.textContent = "";
    event.preventDefault();

    const course = parseInt(form.querySelector("#course-number")?.value, 10);
    const direction = form.querySelector("#direction")?.value;
    const basis = form.querySelector("#basis-of-learning")?.value;
    const evaluations = form.querySelector("#evaluations")?.value;
    const isUnion = form.querySelector("#student-organization").checked;
    const isOrphan = form.querySelector("#student-orphan").checked;

    const amountOfPoints = form.querySelector("#amount-of-points").value;
    const directionOfApplicant = form.querySelector(
      "#direction-of-applicant"
    ).value;
    const basisOfLearningApplicant = form.querySelector(
      "#basis-of-learning-applicant"
    ).value;

    console.log(amountOfPoints);
    console.log(directionOfApplicant);
    console.log(basisOfLearningApplicant);

    if (studentButton.classList.contains("is-active")) {
      if (course) {
        const formData = {
          course,
          direction,
          basis,
          evaluations,
          isUnion,
          isOrphan,
        };
        updateScholarshipsResults(formData);
      }
    } else if (applicantButton.classList.contains("is-active")) {
      if (amountOfPoints) {
        // добавлена проверка
        const formData = {
          amountOfPoints,
          directionOfApplicant,
          basisOfLearningApplicant,
        };
        updateScholarshipsResults(formData);
      }
    }
  });
});
