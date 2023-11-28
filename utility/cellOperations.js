import {
  mapSize,
  colorClasses,
  missionDiv,
  seasons,
  timeLeft_div,
  currentSeason_div,
  elements_div,
  elementTime_div,
  elementType_span,
} from "./constants.js";
import {
  player_name,
  redef,
  gridTiles,
  currentElement,
  handleNextButtonClick,
} from "../src/startGame.js";
import {
  updateMissionPoints,
  selectedMission,
  finalScore
} from "../points/missionHandler.js";
import { calculateFullMountains } from "../points/calculateMissionPoints.js";

export const isIndexInArray = (arr, index, rowcol) => {
  const row = Math.floor(index / rowcol);
  const col = index % rowcol;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === row && arr[i][1] === col) {
      return true;
    }
  }
  return false;
};

export const elementCells = (arr) => {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (arr[i][j] === 1) {
        const pair = [i, j];
        result.push(pair);
      }
    }
  }
  return result;
};

export const mirror = (arr) => {
  const result = [];

  for (const [col, row] of arr) {
    const mirroredCol = col;
    const mirroredRow = 2 - row;
    result.push([mirroredCol, mirroredRow]);
  }

  return result;
};

export const rotate = (arr) => {
  const result = [];

  for (const [col, row] of arr) {
    // if(col===0 && row ===0) result.push([0,2]);
    // if(col===0 && row ===1) result.push([1,2]);
    // if(col===0 && row ===2) result.push([2,2]);
    // if(col===1 && row ===0) result.push([0,1]);
    // if(col===1 && row ===1) result.push([1,1]);
    // if(col===1 && row ===2) result.push([2,1]);
    // if(col===2 && row ===0) result.push([0,0]);
    // if(col===2 && row ===1) result.push([1,0]);
    // if(col===2 && row ===2) result.push([2,0]);

    const rotatedCol = 2 - (2 - row);
    const rotatedRow = 2 - col;

    result.push([rotatedCol, rotatedRow]);
  }

  return result;
};

export function updateGridColors(targetIndex, fromColor, toColor) {
  const neighborDiv = gridTiles[targetIndex];
  neighborDiv.classList.remove(fromColor);
  neighborDiv.classList.add(toColor);
}

export const getNeighbor = (targetIndex) => {
  const targetX = targetIndex % mapSize;
  const targetY = Math.floor(targetIndex / mapSize);
  const result = [];
  for (const [dy, dx] of redef) {
    const x = targetX + dx - 1;
    const y = targetY + dy - 1;

    if (x >= 0 && x < mapSize && y >= 0 && y < mapSize) {
      const neighborIndex = y * mapSize + x;
      result.push(neighborIndex);
    }
  }
  return result;
};

export const isPlacable = (targetIndex) => {
  if (getNeighbor(targetIndex).length !== redef.length) {
    return false;
  }
  for (const index of getNeighbor(targetIndex)) {
    if (!gridTiles[index].classList.contains("EMPTY")) {
      return false;
    }
  }
  return true;
};

export var currentSeasonIndex = 0;

export const handlePlace = (i) => {
  if (isPlacable(i)) {
    for (const tileNumber of getNeighbor(i)) {
      gridTiles[tileNumber].classList.remove("EMPTY");
      gridTiles[tileNumber].classList.add(
        colorClasses[currentElement.type].tag
      );
      updateGridColors(
        tileNumber,
        colorClasses["empty"].color,
        colorClasses[currentElement.type].color
      );
      gridTiles[tileNumber].classList.add(
        colorClasses[currentElement.type].bordertag
      );
      gridTiles[tileNumber].classList.remove(colorClasses["empty"].bordertag);

    //   addBackground(gridTiles[tileNumber],colorClasses[currentElement.type])
    }
    removeHover();
    updateMissionPoints();
    handleSeason();
    updateMissionPoints();
    handleNextButtonClick();
  }
};

export var prevSeasonPoints = 0;
export var FullMountains = 0;

const handleSeason = () => {
  seasons[currentSeasonIndex].timeLeft -= currentElement.time;
  let change = 0 - seasons[currentSeasonIndex].timeLeft;
  if (seasons[3].timeLeft <= 0) {
    showEndScreen();
  } else if (seasons[currentSeasonIndex].timeLeft <= 0) {
    currentSeasonIndex++;
    prevSeasonPoints = 0;
    for (const index of seasons[currentSeasonIndex].same) {
      prevSeasonPoints += selectedMission[index].point;
    }
    seasons[currentSeasonIndex].point -= change;
    seasons[currentSeasonIndex].timeLeft -= change;
    currentSeason_div.innerHTML = `Jelenlegi Évszak: ${seasons[currentSeasonIndex].season}`;
    highlightActiveSeason(seasons[currentSeasonIndex].active);
    FullMountains = calculateFullMountains();
  }
  timeLeft_div.innerHTML = `Hátralévő idő: ${seasons[currentSeasonIndex].timeLeft}/7`;
};

function showEndScreen() {
  const allDiv = document.querySelectorAll("div:not(#end-screen)");
  timeLeft_div.innerHTML = "VÉGE A JÁTÉKNAK!";

  document.getElementById("endGameRemove").classList.add("hidden");

  allDiv.forEach((div) => {
    div.classList.add("pointer-events-none", "opacity-50");
  });
  document.getElementById("player-name").innerText = player_name;
  document.getElementById("player-points").innerText = finalScore;
  document.getElementById("end-screen").classList.remove("hidden");
  document.getElementById("StartNewGame").addEventListener("click", () => {
    window.location.reload();
  });

  document.getElementById("HideEndScreen").addEventListener("click", () => {
    allDiv.forEach((div) => {
      div.classList.remove("opacity-50");
    });
    document.getElementById("end-screen").classList.add("hidden");
    document.getElementById("showEndScreenAgain").classList.remove("hidden");
  });

}

document.getElementById("showEndScreenAgain").addEventListener("click", () => {
  document.getElementById("showEndScreenAgain").classList.add("hidden");
  showEndScreen();
});

export function highlightActiveSeason(arr) {
  for (const x of missionDiv) {
    x.div.classList.remove("bg-green-700");
    x.div.classList.add("bg-gray-700");
  }
  for (const x of arr) {
    missionDiv[x].div.classList.remove("bg-gray-700");
    missionDiv[x].div.classList.add("bg-green-700");
  }
}

export const removeHover = () => {
  gridTiles.forEach((tile) => {
    tile.classList.remove("border-green-300");
    tile.classList.remove("border-red-300");
  });
};

export const addHover = (i) => {
  for (const tileNumber of getNeighbor(i)) {
    if (isPlacable(i)) {
      gridTiles[tileNumber].classList.add("border-green-300");
    } else {
      removeAllBorder[tileNumber];
      gridTiles[tileNumber].classList.add("border-red-300");
    }
  }

  function removeAllBorder(tileNumber) {
    for (const tag in colorClasses) {
      gridTiles[tileNumber].classList.remove(tag.bordertag);
    }
  }
};

export function addBackground(div, type) {
  let imageUrl = type.imageUrl
  div.style.backgroundImage = `url(${imageUrl})`;
  div.style.backgroundSize = "cover";
  div.style.backgroundPosition = "center";
}

export function getTypeHungarianName(type) {
  switch (type) {
      case 'farm':
          return 'farm';
      case 'forest':
          return 'erdő';
      case 'water':
          return 'víz';
      case 'town':
          return 'város';
      default:
          return 'Unknown type';
  }
}
