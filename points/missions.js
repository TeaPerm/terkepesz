import {
  calculateMission0,
  calculateMission1,
  calculateMission2,
  calculateMission3,
  calculateMission4,
  calculateMission5,
  calculateMission6,
  calculateMission7,
  calculateMission8,
  calculateMission9,
  calculateMission10,
  calculateMission11
} from "./calculateMissionPoints.js";

export const missions = [
  {
    "title": "Az erdő széle",
    "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
    "point": 0,
    "setPoint": function () {
      this.point = calculateMission0();
    },
    "image":"../public/images/fasor.png"
  },
  {
    "title": "Álmos-völgy",
    "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
    "point": 0,
    "setPoint": function () {
      this.point = calculateMission1();
    }
  },
  {
    "title": "Krumpliöntözés",
    "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
    "point": 0,
    "setPoint": function () {
      this.point = calculateMission2();
    }
  },
  {
    "title": "Határvidék",
    "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
    "point": 0,
    "setPoint": function () {
      this.point = calculateMission3();
    }
  },
  {
    "title": "Fasor",
    "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz.",
    "point": 0,
    "setPoint": function () {
      this.point = calculateMission4();
    }
  },
  {
    "title": "Gazdag város",
    "description": "A legalább három különböző tereptípussal szomszédos városrégióidért három-három pontot kapsz.",
    "point": 0,
    "setPoint": function () {
      this.point = calculateMission5();
    }
  },
  {
    "title": "Öntözőcsatorna",
    "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. ",
    "point": 0,
    "setPoint": function () {
      this.point = calculateMission6();
    }
  },
  {
    "title": "Mágusok völgye",
    "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
    "point": 0,
    "setPoint": function () {
      this.point = calculateMission7();
    }
  },
  {
    "title": "Üres telek",
    "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
    "point": 0,
    "setPoint": function () {
      this.point = calculateMission8();
    }
  },
  {
    "title": "Sorház",
    "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő városmezők mindegyikéért kettő-kettő pontot kapsz.",
    "point": 0,
    "setPoint": function () {
      this.point = calculateMission9();
    }
  },
  {
    "title": "Páratlan silók",
    "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
    "point": 0,
    "setPoint": function () {
      this.point = calculateMission10();
    }
  },
  {
    "title": "Gazdag vidék",
    "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
    "point": 0,
    "setPoint": function () {
      this.point = calculateMission11();
    }
  }
];
