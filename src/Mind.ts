
import { configs } from 'main.config';
import { autoSpawn } from './Act/autoSpawn'

import { dBug } from 'utils/debugLevels/debugLevels';



Creep.prototype.sayHello = function () {
  // In prototype functions, 'this' usually has the value of the object calling 
  // the function. In this case that is whatever creep you are 
  // calling '.sayHello()' on.
  this.say("Hello!");
};




export class Mind {

  constructor() {
    // Initialize Memory
    Memory.flags ??= {};
    Memory.rooms ??= {};
    Memory.creeps ??= {};
    Memory.feelings??= {
      useLessCpu: configs.preferences.lowCpu,
      useMoreCpu: false,
      cpuUseModifier: 1.0,
      memoryUseModifier: 1.0,
      aggresive: false, 
      defensesive: false, 
      stretchy: false,
    },
    

    Memory.feelings.aggresive ??= false;
    Memory.feelings.defensesive ??= false;
    Memory.feelings.stretchy ??= false;
    
    Memory.thoughts ??={
      logistics: {
        roomStats: {
        }
      },
    ongoing: {
        lastTick: Game.time,
        total: {}
      }
    }
    Memory.creepsOfInterest ??= [];
  }


  newTask(name:string, priority:number=0):Task{
    let task = {
      tId: "ohentoenlo",
    name: name,
      priority: priority,
    finished: false,
  }
  return task;
  }

  think():ActionPlan{
    dBug("THINK", 6, "Thinking of new actionPlan")
    let newActionPlan: ActionPlan = {"spawns":[], "creeps":[]}
    
    for (let spawn in Game.spawns) {
      let newSpawnQueue: CreepBlueprint[] = []
      if (Game.spawns[spawn].memory.spawnQueue?.length == 0 && Object.keys(Game.creeps).length < 6){
        newSpawnQueue = [{
          name: "miner_"+Game.time,
          role: "miner",
          modifiers: [],
          bodyParts: ["carry", "carry", "move", "carry", "work"]
        }]
        
      }
      
      
      
      
      // Game.spawns[spawn];
      //update spawn memory
      const oldMem = Game.spawns[spawn].memory;
      // add a new creep to the spawnQueue
      dBug("THINK", 5, "About to loop through spawns: ")
      dBug("THINK", 8, JSON.stringify(Game.spawns))
      let newMem: SpawnMemory = {
        // isMainInRoom: Game.spawns[0].name == spawn ? true : false,
        isMainInRoom:  true,
        isHub: false,
        desiredWorkers: 3,
        actualWorkers: 0,
        spawnQueue: newSpawnQueue,
        feelings: {
          needWorkers: true
        },
        thoughts: {}
      }
      // For now just add them all to the plan
      if (newActionPlan.spawns == undefined){
        newActionPlan.spawns = [{
          name: spawn,
          update: newMem
        }]
      }else{
        newActionPlan.spawns.push({
          name: spawn,
          update: newMem
        });
      }

    }




    for (let creep in Game.creeps) {
      if (newActionPlan.creeps == undefined) {
        newActionPlan.creeps = [{
          name: creep,
          update: this.newTask("mine")
        }]
      } else {
        newActionPlan.creeps.push({
          name: creep,
          update: this.newTask("mine")
        });
      }
    }







    // for (let room in Memory.thoughts.logistics.roomStats) {
    //   Game.rooms[room];
    //   // Memory.thoughts.logistics.roomStats[room].name;
    // }

    dBug("THINK", 6, "Came up with new actionPlan")
    dBug("THINK", 6, JSON.stringify(newActionPlan))
    return newActionPlan;


  }









  runActions(actionPlan: ActionPlan = {"spawns":[],"creeps":[]}){
    
    // const spawns = decideSpawnsToUse(actionPlan);
    if (actionPlan.spawns?.length == 0){
      return 
    }
    // for (let spawn in actionPlan.spawns) {
    for (let i = 0; i < actionPlan.spawns?.length; i++) {
      let theSpawn = Game.spawns[actionPlan.spawns[i].name];
      autoSpawn(theSpawn);
      // autoSpawn(Game.spawns[spawn.name]);
      // let some = theSpawn.name
    }
    dBug("ACT", 6, "Has " + actionPlan.creeps?.length +" to loop through and act with" )

    for (let i = 0; i < actionPlan.creeps?.length; i++) {
      let theCreep = Game.creeps[actionPlan.creeps[i].name];
      let workUpdate = actionPlan.creeps[i].update == undefined ? actionPlan.creeps[i].update : undefined;
      // theCreep.work(workUpdate)
      dBug("ACT", 6, JSON.stringify(theCreep))
      theCreep.sayHello()
      theCreep.moveTo(25, 24)
    }



    dBug("ACT", 6, "Ran actions with plan")
  }







  
  ActInRoom(agenda:RoomAgenda){
    let room = Game.rooms[agenda.roomName];
    agenda.spawnQueue;
  }

}

