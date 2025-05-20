const directionsData = [
  { name: "01.03.04 Прикладная математика", maxCourse: 4 },
  { name: "09.03.01 Информатика и вычислительная техника", maxCourse: 4 },
  { name: "09.03.02 Информационные системы и технологии", maxCourse: 4 },
  { name: "09.03.03 Прикладная информатика", maxCourse: 4 },
  { name: "09.03.04 Программная инженерия", maxCourse: 4 },
  { name: "10.03.01 Информационная безопасность", maxCourse: 4 },
  { name: "10.05.01 Компьютерная безопасность", maxCourse: 6 },
  {
    name: "10.05.03 Информационная безопасность автоматизированных систем",
    maxCourse: 6,
  },
  {
    name: "15.03.04 Автоматизация технологических процессов и производств",
    maxCourse: 4,
  },
  { name: "27.03.03 Системный анализ и управление", maxCourse: 4 },
  { name: "27.03.04 Управление в технических системах", maxCourse: 4 },
];

document.addEventListener("DOMContentLoaded", function () {
  const courseSelect = document.getElementById("course-number");
  const directionSelect = document.getElementById("direction");

  // Заполняем направления один раз при загрузке
  directionsData.forEach((dir) => {
    const option = document.createElement("option");
    option.value = dir.name;
    option.textContent = dir.name;
    option.dataset.maxCourse = dir.maxCourse;
    directionSelect.appendChild(option);
  });

  courseSelect.addEventListener("change", () => {
    const courseNumber = parseInt(courseSelect.value);

    // Проходим по каждому <option> в направлении
    [...directionSelect.options].forEach((option) => {
      const maxCourse = parseInt(option.dataset.maxCourse);
      if (isNaN(maxCourse)) return; // пропускаем плейсхолдер
      option.disabled = courseNumber > maxCourse;
    });

    // Если выбранное направление стало недоступным, сбрасываем выбор
    if (
      directionSelect.selectedIndex > 0 &&
      directionSelect.options[directionSelect.selectedIndex].disabled
    ) {
      directionSelect.selectedIndex = 0;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".calculator__form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // предотвращаем отправку формы

    // Остальные значения из select
    const course = form.querySelector("#course-number")?.value;
    const direction = form.querySelector("#direction")?.value;
    const basis = form.querySelector("#basis-of-learning")?.value;
    const evaluations = form.querySelector("#evaluations")?.value;

    // Член профсоюза
    const isInUnion = form.querySelector("#student-organization").checked;
    if (course) {
      console.log({
        course,
        direction,
        basis,
        evaluations,
        isInUnion,
      });
    } else {
      console.log('sadasd')
    }
  });
});
