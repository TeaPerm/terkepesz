export const mountains = [[1, 1], [3, 8], [5, 3], [8, 9], [9, 5]];

export const colorClasses = {
  water: {
    color: "bg-blue-200",
    bordertag: "border-blue-200",
    tag: "WATER",
    imageUrl: "../public/images/icons8-water-50.png"
  },
  forest: {
    color: "bg-green-700",
    bordertag: "border-green-700",
    tag: "FOREST",
  },
  town: {
    color: "bg-red-400",
    bordertag: "border-red-400",
    tag: "TOWN",
    imageUrl: "../public/images/townIcon.png"
  },
  farm: {
    color: "bg-yellow-400",
    bordertag: "border-yellow-400",
    tag: "FARM",
    imageUrl: "../public/images/farmIcon.png"
  },
  mountain: {
    color: "bg-red-900",
    bordertag: "border-red-900",
    tag: "MOUNTAIN",
    imageUrl: "../public/images/mountainIcon.png"
  },
  empty: {
    color: "bg-white",
    tag: "EMPTY",
    bordertag: "white-200"
  },
  emptymap: {
    color: "bg-yellow-200",
    tag: "EMPTYMAP",
    bordertag: "border-yellow-200"
  },
};

export const mapSize = 11;
export const elements_div = document.getElementById("elements_div");
export const map_div = document.getElementById("map");
export const play_btn = document.getElementById("playButton");
export const name_inp = document.getElementById("name");
export const pregame_div = document.getElementById("pregame");
export const ingame_div = document.getElementById("ingame");
export const name_h2 = document.querySelector("#ingame h2");
export const next_btn = document.getElementById("next_btn");
export const rotation_btn = document.getElementById("rotation_btn");
export const mirror_btn = document.getElementById("mirror_btn");
export const elementTime_div = document.getElementById("elementTime");
export const basicMissions_div = document.getElementById("basicMissions");
export const sumPoint_div = document.getElementById("sumPoint");
export const timeLeft_div = document.getElementById("timeLeft");
export const currentSeason_div = document.getElementById("currentSeason");
export const elementType_span = document.getElementById("elementType")

export const missionDiv = [
  {
    div: document.getElementById("A"),
    title: document.getElementById("a-title"),
    description: document.getElementById("a-description"),
    point: document.getElementById("a-point")
  },
  {
    div: document.getElementById("B"),
    title: document.getElementById("b-title"),
    description: document.getElementById("b-description"),
    point: document.getElementById("b-point")
  },
  {
    div: document.getElementById("C"),
    title: document.getElementById("c-title"),
    description: document.getElementById("c-description"),
    point: document.getElementById("c-point")
  },
  {
    div: document.getElementById("D"),
    title: document.getElementById("d-title"),
    description: document.getElementById("d-description"),
    point: document.getElementById("d-point")
  }
];

export const gameTime = 28;
export const seasons = [
  {
    "season": "Tavasz",
    "active": [0,1],
    "point": 0,
    "point_div": document.getElementById("fall_Points"),
    "timeLeft": 7,
    "same": [],
  },
  {
    "season": "Nyár",
    "active": [1,2],
    "point": 0,
    "point_div": document.getElementById("summer_Points"),
    "timeLeft": 7,
    "same" : [1],
  },
  {
    "season": "Ősz",
    "active": [2,3],
    "point": 0,
    "point_div": document.getElementById("autumn_Points"),
    "timeLeft": 7,
    "same" : [2],
  },
  {
    "season": "Tél",
    "active": [3,0],
    "point": 0,
    "point_div": document.getElementById("winter_Points"),
    "timeLeft": 7,
    "same" : [0,3],
  }
];

