
const harvesterBodyParts = require("./role.harvester.bodyParts");
const builderBodyParts = require("./role.builder.bodyParts");
const defenderBodyParts = require("./role.defender.bodyParts");
// const testerBodyParts = require("./tester.bodyParts");

// just some definitions so they make sense when you see them:
// rc(Level) = Room Controller

const config = {
  "debugLevel":3,

  "colors":{
    "paths":{
      "energy":"#ffaa00",
      "build":"#ffaa00",
      "upgrade":"#ffaa00",
      "upgrade":"#ffaa00",
      "war":"#ffaa00",
    }
  },

  "ticksBetweenDeathCheck" : 5,
  "ticksBetweenRoomDefenseCheck" :20, // Do we have enemies in the room that should be attacked?
  "ticksBetweenRoomStatusCheck" :100, // Are we at war? Do we need more builders or harvesters?
  "ticksBetweenDhseathCheck" : 3,
  "ticksBetweenDseathCheck" : 3,


  "rcLevel_1":{
    "repairWallMin": 100,
    "repairWallMax": 1000,
    "jobs":{ // the number of creeps of each type we want to maintain
      "harvester":1,
      "builder":1,
      "defender":0,
      // "tester":1,
    },
    "bodyParts":{
      "harvester": harvesterBodyParts.rcLevel_1,
      "builder": builderBodyParts.rcLevel_1,
      "defender": defenderBodyParts.rcLevel_1,
      // "tester": testerBodyParts.rcLevel_1,
    },
    "priorities":{// these will be used for some decision making (higher = more important)
      "harvest": 9,
      "build": 8,
      "upgrade": 7,
      "test": 4,
      "defend": 0,
      "pillage": 0,
    }
  },


  "rcLevel_2":{
    "repairWallMin": 10000,
    "repairWallMax": 100000,
    "jobs":{
      "harvester":1,
      "builder":1,
      "defender":1,
      // "tester":4,
    },
    "bodyParts":{
      "harvester": harvesterBodyParts.rcLevel_2,
      "builder": builderBodyParts.rcLevel_2,
      "defender": defenderBodyParts.rcLevel_2,
      // "tester": testerBodyParts.rcLevel_2,
    },
    "priorities":{
      "harvest": 9,
      "build": 8,
      "upgrade": 7,
      "test": 5,
      "defend": 1,
      "pillage": 0,
    }
  },


  "rcLevel_3":{
    "repairWallMin": 100000,
    "repairWallMax": 3000000,
    "jobs":{
      "harvester":9,
      "builder":6,
      "defender":4,
      // "tester":4,
    },
    "bodyParts":{
      "harvester": harvesterBodyParts.rcLevel_3,
      "builder": builderBodyParts.rcLevel_3,
      "defender": defenderBodyParts.rcLevel_3,
      // "tester": testerBodyParts.rcLevel_3,
    },
    "priorities":{
      "harvest": 9,
      "build": 8,
      "upgrade": 7,
      "test": 5,
      "defend": 6,
      "pillage": 0,
    }
  },


  "rcLevel_4":{
    "repairWallMin": 999999999,
    "repairWallMax": 999999999,
    "jobs":{
      "harvester":8,
      "upgrader":9,
      "builder":4,
      "tester":4,
    },
    "bodyParts":{
      "harvester": harvesterBodyParts.rcLevel_4,
      // "upgrader": upgraderBodyParts.rcLevel_4,
      // "builder": builderBodyParts.rcLevel_4,
      // "tester": testerBodyParts.rcLevel_4,
    },
    "priorities":{
      "harvest": 9,
      "build": 8,
      "upgrade": 7,
      "test": 5,
      "defend": 6,
      "pillage": 1,
    }
  },


  "rcLevel_5":{
    "repairWallMin": 999999999,
    "repairWallMax": 999999999,
    "jobs":{
      "harvester":10,
      "upgrader":9,
      "builder":5,
      "tester":4,
    },
    "bodyParts":{
      "harvester": harvesterBodyParts.rcLevel_5,
      // "upgrader": upgraderBodyParts.rcLevel_5,
      // "builder": builderBodyParts.rcLevel_5,
      // "tester": testerBodyParts.rcLevel_5,
    },
    "priorities":{
      "harvest": 9,
      "build": 8,
      "upgrade": 7,
      "test": 5,
      "defend": 6,
      "pillage": 1,
    }
  },

}



module.exports = config;
