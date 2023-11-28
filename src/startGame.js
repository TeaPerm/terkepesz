import {
  isIndexInArray,
  elementCells,
  mirror,
  rotate,
  removeHover,
  addHover,
  handlePlace,
  highlightActiveSeason,
  currentSeasonIndex,
  addBackground,
  getTypeHungarianName,
} from "../utility/cellOperations.js";
import {
  seasons,
  mapSize,
  mountains,
  colorClasses,
  elements_div,
  map_div,
  name_inp,
  name_h2,
  next_btn,
  rotation_btn,
  mirror_btn,
  elementTime_div,
  pregame_div,
  elementType_span,
} from "../utility/constants.js";
import { elementList } from "./elements.js";
import { generateRandomElementList } from "../utility/randomizeElements.js";
import { showMissions } from "../points/missionHandler.js";

export let player_name;

export var element_index = 0;
export var elements = generateRandomElementList(elementList);

export var currentElement = elements[element_index];
export let redef = elementCells(elements[element_index].shape);
export var gridTiles = [];

export function startGame() {
  if (name_inp.value === "") {
    name_inp.classList.add("border-red-400");
    name_inp.placeholder = "Add meg a neved!";
    name_inp.classList.add("shake");
    
    name_inp.addEventListener("animationend", () => {
      name_inp.classList.remove("shake");
    });
    return;
  }
  player_name = name_inp.value;
  document.getElementById("wholebody").classList.remove("hidden");

  pregame_div.classList.add("hidden");
  name_h2.innerHTML = player_name + " Birodalma";

  highlightActiveSeason(seasons[0].active);

  //11x11 csinálás
  for (let i = 0; i < mapSize * mapSize; i++) {
    const div = document.createElement("div");
    div.id = "mapGrid" + i;
    div.className =
      "h-full w-full transition-colors border-2 gap-3 rounded-lg duration-0";

    //hegyek lerakása
    if (isIndexInArray(mountains, i, mapSize)) {
      div.classList.add(
        colorClasses["mountain"].color,
        colorClasses["mountain"].tag,
        colorClasses["mountain"].bordertag
      );

      addBackground(div,colorClasses["mountain"])

    } else {
      div.classList.add(
        colorClasses["empty"].tag,
        colorClasses["empty"].color,
        colorClasses["empty"].bordertag
      );
    }

    // elem lehelyezése
    div.addEventListener("click", function () {
      handlePlace(i);
    });

    //hover
    div.addEventListener("mouseover", function () {
      addHover(i);
    });

    // hover ki
    div.addEventListener("mouseout", function () {
      removeHover();
    });

    map_div.append(div);
    gridTiles.push(div);
  }

  create3x3();
  showMissions();

  document.addEventListener("keydown", function (event) {
    if (event.key === "a") {
      handleRotation();
      removeHover();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "s") {
      handleMirror();
      removeHover();
    }
  });
}

//3x3 csinálás
function create3x3() {
  for (let i = 0; i < 9; i++) {
    elementTime_div.innerHTML = currentElement.time;
    elementType_span.innerHTML = getTypeHungarianName(currentElement.type);
    const div = document.createElement("div");

    div.id = "placable" + i;
    div.className = "w-full h-full border border-black rounded-lg";
    const initColor = colorClasses[currentElement.type].color;
    if (isIndexInArray(redef, i, 3)) {
      div.classList.add(initColor);
    } else {
      div.classList.add(colorClasses["empty"].color);
    }
    elements_div.append(div);
  }
}

let prevSeason = seasons[0];

export function handleNextButtonClick() {
  let currentSeason = seasons[currentSeasonIndex];

  if (currentSeason !== prevSeason) {
    elements = generateRandomElementList(elementList);
    element_index = 0;
  } else {
    element_index++;
  }

  currentElement = elements[element_index];
  elementTime_div.innerHTML = currentElement.time;
  elementType_span.innerHTML = getTypeHungarianName(currentElement.type);

  const currentColor = colorClasses[elements[element_index].type].color;
  redef = elementCells(elements[element_index].shape);

  for (let i = 0; i < 9; i++) {
    const gridDiv = document.getElementById(`placable${i}`);
    removeAllColor(gridDiv);

    gridDiv.classList.add(colorClasses["empty"].color);
    if (isIndexInArray(redef, i, 3)) {
      gridDiv.classList.remove(colorClasses["empty"].color);
      gridDiv.classList.add(currentColor);
    }
  }

  function removeAllColor(div) {
    div.classList.remove(colorClasses["town"].color);
    div.classList.remove(colorClasses["forest"].color);
    div.classList.remove(colorClasses["water"].color);
    div.classList.remove(colorClasses["farm"].color);
  }
  prevSeason = currentSeason;
}

next_btn.addEventListener("click", handleNextButtonClick);

const handleMirror = () => {
  const prev_index = element_index;
  const prevColor = colorClasses[elements[prev_index].type].color;
  const currentColor = colorClasses[elements[element_index].type].color;
  redef = mirror(redef);

  // Színek tükrözése
  for (let i = 0; i < 9; i++) {
    const gridDiv = document.getElementById(`placable${i}`);

    gridDiv.classList.remove(prevColor);
    gridDiv.classList.add(colorClasses["empty"].color);
    if (isIndexInArray(redef, i, 3)) {
      gridDiv.classList.add(currentColor);
    }
  }
};
mirror_btn.addEventListener("click", handleMirror);

const handleRotation = () => {
  const prev_index = element_index;
  const prevColor = colorClasses[elements[prev_index].type].color;
  const currentColor = colorClasses[elements[element_index].type].color;
  currentElement = elements[element_index];
  redef = rotate(redef);

  //színek tükrözése
  for (let i = 0; i < 9; i++) {
    const gridDiv = document.getElementById(`placable${i}`);
    gridDiv.classList.remove(prevColor);
    gridDiv.classList.add(colorClasses["empty"].color);

    if (isIndexInArray(redef, i, 3)) {
      gridDiv.classList.add(currentColor);
    }
  }
};

rotation_btn.addEventListener("click", handleRotation);
