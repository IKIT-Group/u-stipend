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

  directionsData.forEach((dir) => {
    const option = document.createElement("option");
    option.value = dir.name;
    option.textContent = dir.name;
    option.dataset.maxCourse = dir.maxCourse;
    directionSelect.appendChild(option);
  });

  courseSelect.addEventListener("change", () => {
    const courseNumber = parseInt(courseSelect.value);

    
    [...directionSelect.options].forEach((option) => {
      const maxCourse = parseInt(option.dataset.maxCourse);
      if (isNaN(maxCourse)) return; 
      option.disabled = courseNumber > maxCourse;
    });

    if (
      directionSelect.selectedIndex > 0 &&
      directionSelect.options[directionSelect.selectedIndex].disabled
    ) {
      directionSelect.selectedIndex = 0;
    }
  });
});


