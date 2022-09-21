
import { configs } from 'main.config';
import { autoSpawn } from './Act/autoSpawn'

import { dBug } from 'utils/debugLevels/debugLevels';




export class Mind {



  newTask(name:string, priority:number=3):Task{
    let task = {
    name: name,
    priority: priority,
    finished: false,
  }
  return task;
  }

  
  think(){
    dBug("THINK", 6, "thUS started thinking")
    let newActionPlan: ActionPlan = {"spawns":[], "creeps":[]}


    
    // create a dictionary of rooms and their spawns
    let roomsAndSpawns: RoomsAndSpawnsDictionary = {};
    for (let spawn in Game.spawns) {
      let roomName = Game.spawns[spawn].memory.roomName
      if (Object.keys(roomsAndSpawns).includes(roomName)){
        roomsAndSpawns[roomName].push(spawn)
      }else{
        roomsAndSpawns[roomName] = [spawn]
      }
    }

    // let each room think for itself
    // which will then let it's spawns and creeps think for themselves
    for(let room in roomsAndSpawns){
      // roomsAndSpawns[room].length
      Game.rooms[room].think(roomsAndSpawns);
    }

    // dBug("THINK", 6, "Came up with new actionPlan"+JSON.stringify(newActionPlan))
    dBug("THINK", 6, "thUS finished thinking")
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
      theCreep.moveTo(25, 24)
    }



    dBug("ACT", 6, "Ran actions with plan")
  }







  
  // ActInRoom(agenda:RoomAgenda){
  //   let room = Game.rooms[agenda.roomName];
  //   agenda.spawnQueue;
  // }







  constructor() {
    // Initialize Memory
    Memory.flags ??= {};
    Memory.rooms ??= {};
    Memory.creeps ??= {};
    Memory.feelings ??= {
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

    Memory.thoughts ??= {
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








}

