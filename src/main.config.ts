
// just some definitions so they make sense when you see them:
// rc(Level) = Room Controller

export const configs = {
  "debugLevel":{
    "SPAWN": 9,
    "TASK": 9,
    "ROLE": 9,
    "ACT": 9,
    "THINK": 9,
    "FEEL": 9,
    "DECIDE":9,
    "HIVEMIND": 9,
    "MEMORY": 9,
  },

  
  // These are the starting places, knobs will be adjusted by the bot,
  // use "preferences" to dial those adjustments in
  "defaults":{
    "lowCpu":false,
  },
  "preferences":{
    "lowCpu": false, // use to spefically consume less than needed (for pixels...?)
    "cpuModifier": 1.0, // 1 = normal, increase to use more CPU on average
  },

  "colors":{
    "paths":{
      "energy":"#ffaa00",
      "build":"#00aaff",
      "upgrade":"#00aa00",
      "war":"#ff0000",
    }
  },

  "emojis":{
    "error":"💥",
    "resources":{
      "energy": "⚡️" // ? 🟡 
    },
    "tasks":{
      "mine":"⛏",
      "build":"🔨",
      "upgrade": "📈", //🔗 ⛓
      "Repair":"🔧",
      "Store":"💰",
      "Defend":"🛡️",
    }
  },

  "ticksBetweenDeathCheck": 20,
  "ticksBetweenRoomDefenseCheck": 100, // Do we have enemies in the room that should be attacked?
  "ticksBetweenRoomHealCheck": 2, // Do we have enemies in the room that should be attacked?
  
  "ticksBetweenRoomStatusCheck": 100, // Are we at war? Do we need more builders or harvesters?
  "ticksBetweenRoomPlanningCheck": 2, // Are we at war? Do we need more builders or harvesters?

  "minimumEnergyToPickup": 50,
  
  // "ticksBetweenRoomIncomeCheck": 40,
  "ticksBetweenRoomIncomeAverageUpdate": 60,
  "minimumDesiredEnergyIncome": 3, // per tick
  "minimumDesiredEnergyIncome_perControllerLvl": 1, // per tick

  "ticksBetweenRoomSpawnCheck": 100,



  "rcLevel_1":{
    "repairWallMin": 100,
    "repairWallMax": 1000,
    "jobs":{ // the number of creeps of each type we want to maintain
      "harvester":2,
      "builder":1,
      "defender":0,
      "planner":1,
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
      "harvester":6,
      "builder":2,
      "defender":0,
      "planner":2,
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
      "planner":1,
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


