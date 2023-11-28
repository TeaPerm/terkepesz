import { missions } from "../points/missions.js";

export function randomizeElements(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateRandomElementList(elementList) {
  const shuffledList = [...elementList];

  for (let i = shuffledList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
  }

  return shuffledList;
}

export function generateRandomMissions() {
  const randomMissions = [];
  const missionIndices = [];

  while (randomMissions.length < 4) {
    const randomIndex = Math.floor(Math.random() * missions.length);
    if (!missionIndices.includes(randomIndex)) {
      missionIndices.push(randomIndex);
      randomMissions.push(missions[randomIndex]);
    }
  }

  return randomMissions;
}
