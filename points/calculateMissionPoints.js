import { mapSize } from "../utility/constants.js";
import { gridTiles } from "../src/startGame.js";

// A hegyek teljes bekerítésével 1 plusz pont szerezhető
export function calculateFullMountains() {
  let result = 0;

  for (let i = 0; i < mapSize * mapSize; i++) {
    if (gridTiles[i].classList.contains("MOUNTAIN")) {
      if (
        i - 11 >= 0 &&
        !gridTiles[i - 11].classList.contains("EMPTY") &&
        i - 1 >= 0 &&
        !gridTiles[i - 1].classList.contains("EMPTY") &&
        i + 1 < mapSize*mapSize &&
        !gridTiles[i + 1].classList.contains("EMPTY") &&
        i + 11 < mapSize*mapSize &&
        !gridTiles[i + 11].classList.contains("EMPTY")
      ) {
        result++;
      }
    }
  }

  return result;
}

//"A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
export function calculateMission0() {
  let result = 0;

  for (let i = 0; i < mapSize * mapSize; i++) {
    if (
      gridTiles[i].classList.contains("FOREST") &&
      (i < mapSize ||
        i % mapSize === 0 ||
        i % mapSize === 10 ||
        i >= mapSize * (mapSize - 1))
    ) {
      result++;
    }
  }
  return result;
}

// "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
export function calculateMission1() {
  let result = 0;
  let forestRowCount = 0;

  for (let i = 0; i < mapSize * mapSize; i++) {
    if (i % mapSize === 0) {
      if (forestRowCount === 3) {
        result += 4;
      }
      forestRowCount = 0;
    }
    if (gridTiles[i].classList.contains("FOREST")) {
      forestRowCount++;
    }
  }
  return result;
}

//"A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
export function calculateMission2() {
  let result = 0;
  for (let i = 0; i < mapSize * mapSize; i++) {
    if (gridTiles[i].classList.contains("FARM")) {
      if (i - 11 >= 0 && gridTiles[i - 11].classList.contains("WATER")) {
        result += 2;
      }
      if (i - 1 >= 0 && gridTiles[i - 1].classList.contains("WATER")) {
        result += 2;
      }
      if (
        i + 1 < mapSize * mapSize &&
        gridTiles[i + 1].classList.contains("WATER")
      ) {
        result += 2;
      }
      if (
        i + 11 < mapSize * mapSize &&
        gridTiles[i + 11].classList.contains("WATER")
      ) {
        result += 2;
      }
    }
  }
  return result;
}

//  "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
export function calculateMission3() {
  let result = 0;
  let fullRowCount = 0;

  //sor
  for (let i = 0; i < mapSize * mapSize; i++) {
    if (i % mapSize === 0) {
      if (fullRowCount === mapSize) {
        result += 6;
      }
      fullRowCount = 0;
    }
    if (!gridTiles[i].classList.contains("EMPTY")) {
      fullRowCount++;
    }
  }

  //oszlop
  for (let i = 0; i < mapSize; i++) {
    let isColumnFull = true;
    for (let j = 0; j < mapSize; j++) {
      const index = j * mapSize + i;
      if (gridTiles[index].classList.contains("EMPTY")) {
        isColumnFull = false;
        break;
      }
    }
    if (isColumnFull) {
      result += 6;
    }
  }

  return result;
}

// "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért."
export function calculateMission4() {
  let maxVerticalForests = 0;
  let currentVerticalForests = 0;

  for (let col = 0; col < mapSize; col++) {
    currentVerticalForests = 0;

    for (let row = 0; row < mapSize; row++) {
      const index = col + row * mapSize;

      if (gridTiles[index].classList.contains("FOREST")) {
        currentVerticalForests++;
      } else {
        maxVerticalForests = Math.max(
          maxVerticalForests,
          currentVerticalForests
        );
        currentVerticalForests = 0;
      }
    }

    maxVerticalForests = Math.max(maxVerticalForests, currentVerticalForests);
  }

  return maxVerticalForests * 2;
}

// "A legalább három különböző tereptípussal szomszédos városrégióidért három-három pontot kapsz.",
export function calculateMission5() {
  let result = 0;
  const typeSet = new Set();

  for (let i = 0; i < mapSize * mapSize; i++) {
    if (getType(i) === "TOWN") {
      if (i - 11 >= 0) {
        let type1 = getType(i - 11);
        if (type1 != null) {
          typeSet.add(type1);
        }
      }
      if (i - 1 >= 0) {
        let type2 = getType(i - 1);
        if (type2 != null) {
          typeSet.add(type2);
        }
      }
      if (i + 1 < mapSize * mapSize) {
        let type3 = getType(i + 1);
        if (type3 != null) {
          typeSet.add(type3);
        }
      }
      if (i + 11 < mapSize * mapSize) {
        let type4 = getType(i + 11);
        if (type4 != null) {
          typeSet.add(type4);
        }
      }
      if (typeSet.size >= 3) {
        result += 3;
      }
      typeSet.clear();
    }
  }

  return result;
  function getType(index) {
    if (gridTiles[index].classList.contains("WATER")) {
      return "WATER";
    }
    if (gridTiles[index].classList.contains("FOREST")) {
      return "FOREST";
    }
    if (gridTiles[index].classList.contains("FARM")) {
      return "FARM";
    }
    if (gridTiles[index].classList.contains("MOUNTAIN")) {
      return "MOUNTAIN";
    }
    if (gridTiles[index].classList.contains("TOWN")) {
      return "TOWN";
    }
    return null;
  }
}
// "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.",
export function calculateMission6() {
  let totalPoints = 0;

  for (let i = 0; i < mapSize; i++) {
    let townCount = 0;
    let waterCount = 0;

    for (let j = 0; j < mapSize; j++) {
      const index = j * mapSize + i;
      if (gridTiles[index].classList.contains("FARM")) {
        townCount++;
      }
      if (gridTiles[index].classList.contains("WATER")) {
        waterCount++;
      }
    }

    if (townCount >= 1 && waterCount >= 1 && townCount === waterCount) {
      totalPoints += 4;
    }
  }
  return totalPoints;
}

//"A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
export function calculateMission7() {
  let result = 0;
  for (let i = 0; i < mapSize * mapSize; i++) {
    if (gridTiles[i].classList.contains("MOUNTAIN")) {
      if (i - 11 >= 0 && gridTiles[i - 11].classList.contains("WATER")) {
        result += 3;
      }
      if (i - 1 >= 0 && gridTiles[i - 1].classList.contains("WATER")) {
        result += 3;
      }
      if (
        i + 1 < mapSize * mapSize &&
        gridTiles[i + 1].classList.contains("WATER")
      ) {
        result += 3;
      }
      if (
        i + 11 < mapSize * mapSize &&
        gridTiles[i + 11].classList.contains("WATER")
      ) {
        result += 3;
      }
    }
  }
  return result;
}

// "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
export function calculateMission8() {
  let result = 0;
  for (let i = 0; i < mapSize * mapSize; i++) {
    if (gridTiles[i].classList.contains("TOWN")) {
      if (i - 11 >= 0 && gridTiles[i - 11].classList.contains("EMPTY")) {
        result += 2;
      }

      if (i - 1 >= 0 && gridTiles[i - 1].classList.contains("EMPTY")) {
        result += 2;
      }
      if (
        i + 1 < mapSize * mapSize &&
        gridTiles[i + 1].classList.contains("EMPTY")
      ) {
        result += 2;
      }
      if (
        i + 11 < mapSize * mapSize &&
        gridTiles[i + 11].classList.contains("EMPTY")
      ) {
        result += 2;
      }
    }
  }
  return result;
}

// "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.",
export function calculateMission9() {
  let maxTownSequence = 0;

  for (let i = 0; i < mapSize; i++) {
    let currentLength = 0;

    for (let j = 0; j < mapSize; j++) {
      const index = i * mapSize + j;

      const isTown = gridTiles[index].classList.contains("TOWN");

      if (isTown) {
        currentLength++;
        maxTownSequence = Math.max(maxTownSequence, currentLength);
      } else {
        currentLength = 0;
      }
    }
  }
  return maxTownSequence * 2;
}

// "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
export function calculateMission10() {
  let result = 0;

  for (let i = 0; i < mapSize; i++) {
    if ((i + 1) % 2 !== 0) {
      let isColumnFull = true;
      for (let j = 0; j < mapSize; j++) {
        const index = j * mapSize + i;
        if (gridTiles[index].classList.contains("EMPTY")) {
          isColumnFull = false;
          break;
        }
      }
      if (isColumnFull) {
        result += 10;
      }
    }
  }

  return result;
}

// "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
export function calculateMission11() {
  let result = 0;
  const typeSet = new Set();

  for (let i = 0; i < mapSize * mapSize; i++) {
    let type1 = getType(i);
    if (type1 != null) {
      typeSet.add(type1);
    }
    if (i % mapSize === 0) {
      if (typeSet.size >= 5) {
        result += 4;
      }
      typeSet.clear();
    }
  }

  return result;

  function getType(index) {
    if (gridTiles[index].classList.contains("WATER")) {
      return "WATER";
    }
    if (gridTiles[index].classList.contains("FOREST")) {
      return "FOREST  ";
    }
    if (gridTiles[index].classList.contains("FARM")) {
      return "FARM";
    }
    if (gridTiles[index].classList.contains("TOWN")) {
      return "TOWN";
    }
    if (gridTiles[index].classList.contains("MOUNTAIN")) {
      return "MOUNTAIN";
    }
    return null;
  }
}
