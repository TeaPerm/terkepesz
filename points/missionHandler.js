import { generateRandomMissions } from "../utility/randomizeElements.js";
import { missionDiv, seasons, sumPoint_div } from "../utility/constants.js";
import { currentSeasonIndex, prevSeasonPoints } from "../utility/cellOperations.js";
import { calculateFullMountains } from "./calculateMissionPoints.js";

export const selectedMission = generateRandomMissions();
export var finalScore = 0;

export const showMissions = () => {
    for (let i = 0; i < selectedMission.length; i++) {
        missionDiv[i].title.innerHTML = selectedMission[i].title;
        missionDiv[i].description.innerHTML = selectedMission[i].description;
    }
}

export const sumPoints = (arr) => {
    let result = 0;

    for (const x of arr) {
        result += x;
    }
    return result;
}

export const updateMissionPoints = () => {
    for (const index of seasons[currentSeasonIndex].active) {
        selectedMission[index].setPoint();
        missionDiv[index].point.innerHTML = `${selectedMission[index].point} pont`;
        seasons[currentSeasonIndex].point += selectedMission[index].point;
    }
    if(seasons[currentSeasonIndex].point > 0 && selectedMission[seasons[currentSeasonIndex].active[0]].point + selectedMission[seasons[currentSeasonIndex].active[1]].point-prevSeasonPoints > 0){
        seasons[currentSeasonIndex].point = selectedMission[seasons[currentSeasonIndex].active[0]].point + selectedMission[seasons[currentSeasonIndex].active[1]].point-prevSeasonPoints;
        seasons[currentSeasonIndex].point_div.innerHTML = `${seasons[currentSeasonIndex].point} pont`;
    }

    let points = selectedMission.map(item => item.point);
    finalScore = sumPoints(points)+calculateFullMountains();
    if(calculateFullMountains()>0){
        sumPoint_div.innerHTML = `Összesen: ${finalScore-calculateFullMountains()}+${calculateFullMountains()} pont`
    }
    else{
        sumPoint_div.innerHTML = `Összesen: ${finalScore} pont`
    }
}
