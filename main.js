import "./style.css";

const data = [
  {
    name: "Мост",
    coords: [714, 446],
    color: "blue",
  },
  {
    name: "Стадион",
    coords: [480, 695],
    color: "green",
  },
  {
    name: "Паркинг",
    coords: [280, 580],
    color: "blue",
  },
  {
    name: "Ресторан",
    coords: [629, 1081],
    color: "blue",
  },
  {
    name: "Вокзал",
    coords: [404, 1148],
    color: "green",
  },
  {
    name: "Отель",
    coords: [820, 1107],
    color: "green",
  },
  {
    name: "Бизнес центр",
    coords: [669, 1306],
    color: "green",
  },
  {
    name: "Жилой дом",
    coords: [170, 1390],
    color: "blue",
  },
  {
    name: "Администрация",
    coords: [475, 1414],
    color: "blue",
  },
  {
    name: "Бизнес центр",
    coords: [723, 1593],
    color: "blue",
  },
];

const btn = (name, color, coords) =>
  `<button class="btn btn_${color}" style="top: ${coords[0]}vh; left: ${coords[1]}vw"><span class="name">${name}</span></button>`;

document.querySelector("#app").innerHTML = `
  <div class="map"></div>
`;

const map = document.querySelector(".map");
let btns;
let timer;

window.addEventListener("click", (e) => {
  const btnActive = document.querySelector(".btn_active");

  if (btnActive && btnActive !== e.target) {
    btnActive.classList.remove("btn_active");
  }

  if (e.target.classList.contains("btn")) {
    e.target.classList.toggle("btn_active");
  }
});

window.addEventListener("resize", () => {
  if (!timer) {
    timer = setTimeout(() => {
      setCoords();
      timer = null;
    }, 300);
  }
});

function getCoords(coords) {
  const defWidth = 1920;
  const defHeight = 1080;

  return [(coords[0] * 100) / defHeight, (coords[1] * 100) / defWidth];
}

function setCoords() {
  if (!btns) btns = document.querySelectorAll(".btn");

  [...btns].forEach((btn, i) => {
    const coords = getCoords(data[i].coords);

    btn.style.top = coords[0] + "%";
    btn.style.left = coords[1] + "%";
  });
}

(function addPoints(getCoords, data) {
  map.innerHTML = data
    .map((point) => btn(point.name, point.color, getCoords(point.coords)))
    .join("");
})(getCoords, data);
