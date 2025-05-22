const SCHOLARSHIPS = [
  {
    name: "Государственная Академическая Стипендия",
    amountByEvaluation: {
      "Еще нет оценок": 3340,
      "Тройки или долги": 0,
      Четверки: 3340,
      "Четверки и пятерки": 4170,
      Пятерки: 5000,
    },
    key: "base",
    condition: ({ basis }) => basis === "budget",
  },
  {
    name: "Повышенная Государственная Академическая стипендия",
    amountByEvaluation: {
      "Еще нет оценок": 0,
      "Тройки или долги": 0,
      Четверки: 12800,
      "Четверки и пятерки": 13630,
      Пятерки: 14460,
    },
    key: "advanced",
    condition: ({ basis }) => basis === "budget",
    needsDocuments: true,
  },
  {
    name: "Социальная стипендия",
    key: "social",
    condition: ({ basis }) => basis === "budget",
    amountByEvaluation: {
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
      "Еще нет оценок": 0,
      "Тройки или долги": 0,
      Четверки: 6000,
      "Четверки и пятерки": 6000,
      Пятерки: 6000,
    },
    key: "regional",
    condition: ({ basis, course }) => basis === "budget" && course <= 2,
    needsDocuments: true,
  },
  {
    name: "Стипендия Правительства РФ",
    amountByEvaluation: {
      "Еще нет оценок": 0,
      "Тройки или долги": 0,
      Четверки: 7000,
      "Четверки и пятерки": 7000,
      Пятерки: 7000,
    },
    key: "gov",
    condition: [
      ({ direction }) => !direction.includes("09.03.03 Прикладная информатика"),
      ({ basis }) => basis === "budget",
    ],
    needsDocuments: true,
  },
  {
    name: "Стипендия Президента РФ",
    amountByEvaluation: {
      "Еще нет оценок": 0,
      "Тройки или долги": 0,
      Четверки: 10000,
      "Четверки и пятерки": 10000,
      Пятерки: 10000,
    },
    key: "president",
    condition: [
      ({ direction }) => !direction.includes("09.03.03 Прикладная информатика"),
      ({ basis }) => basis === "budget",
    ],
    needsDocuments: true,
  },
  {
    name: "Стипендия для студентов платной основы от ППОС СФУ",
    amount: 1000,
    key: "ppos",
    condition: ({ basis, isUnion }) => basis === "paying" && isUnion,
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
    "Еще нет оценок": "Еще нет оценок",
    "Тройки или академическая задолженность": "Тройки или долги",
    Четверки: "Четверки",
    "Четверки и пятерки": "Четверки и пятерки",
    Пятерки: "Пятерки",
  };
  const evalKey = evaluationMap[formData.evaluations] || formData.evaluations;

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

  form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const course = parseInt(form.querySelector("#course-number")?.value, 10);
    const direction = form.querySelector("#direction")?.value;
    const basis = form.querySelector("#basis-of-learning")?.value;
    const evaluations = form.querySelector("#evaluations")?.value;
    const isUnion = form.querySelector("#student-organization").checked;
    const isOrphan = form.querySelector("#student-orphan").checked;

    if (course) {
      const formData = {
        course,
        direction,
        basis,
        evaluations,
        isUnion,
        isOrphan,
      };
      console.log(formData);
      updateScholarshipsResults(formData);
    } else {
      console.log("sadasd");
    }
  });
});
