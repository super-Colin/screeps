

// just some definitions so they make sense when you see them:
// rc(Level) = Room Controller

const config = {
  "colors":{
    "paths":{
      "energy":"#ffaa00",
      "build":"#ffaa00",
      "upgrade":"#ffaa00",
      "upgrade":"#ffaa00",
      "war":"#ffaa00",
    }
  },
  "ticksBetweenDeathCheck" : 3,
  "ticksBetweenRoomStatusCheck" :100, // Are we at war? Do we need more builders or harvesters?
  "ticksBetweenDhseathCheck" : 3,
  "ticksBetweenDseathCheck" : 3,


  "rcLevel_1":{
    "repairWallMin": 100,
    "repairWallMax": 1000,
    "jobs":{ // the number of creeps of each type we want to maintain
      "harvester":3,
      "upgrader":2,
      "builder":1,
      "tester":1,
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
      "harvester":4,
      "upgrader":8,
      "builder":3,
      "tester":4,
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
      "harvester":6,
      "upgrader":9,
      "builder":4,
      "tester":4,
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
