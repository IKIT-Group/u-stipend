const SCHOLARSHIPS = [
  {
    name: "Государственная Академическая Стипендия",
    amount: 3340,
    key: "base",
    condition: (evaluations, basis) =>
      evaluations !== "Тройки или академическая задолженность" &&
      basis === "budget",
    status: "success",
  },
  {
    name: "Повышенная Государственная Академическая стипендия",
    amountByEvaluation: {
      "Четверки": 12800,
      "Четверки и пятерки": 13630,
      "Пятерки": 14460,
    },
    key: "advanced",
    condition: (evaluations, basis) =>
      evaluations !== "Еще нет оценок" &&
      evaluations !== "Тройки или академическая задолженность" &&
      basis === "budget",
    status: "warning",
  },
  {
    name: "Социальная стипендия",
    amount: 4670,
    key: "social",
    condition: () => true, 
    status: "danger",
  },
  {
    name: "Краевая выплата",
    amount: 14400,
    key: "regional",
    condition: (evaluations, basis, course, direction) =>
      course >= 2 && basis === "budget" && direction.includes("информатика"),
    status: "success",
  },
  {
    name: "Стипендия Правительства РФ",
    amount: 7000,
    key: "gov",
    condition: () => false,
    status: "warning",
  },
  {
    name: "Стипендия Президента РФ",
    amount: 10000,
    key: "president",
    condition: () => false,
    status: "danger",
  },
  {
    name: "Стипендия для студентов платной основы от ППОС СФУ",
    amount: 1000,
    key: "ppos",
    condition: (evaluations, basis, course, direction, inUnion) =>
      basis === "paying" && inUnion,
    status: "success",
  },
];

