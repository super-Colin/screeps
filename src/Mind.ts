
import { configs } from 'main.config';
import { autoSpawn } from './Act/autoSpawn'

import { dBug } from 'utils/debugLevels/debugLevels';
import { thinkForRoom } from 'Think/Room';
import { workerGeneralDecisionTree } from 'Act/Creeps/Roles_Workers';




export class Mind {



  
  think(): RoomsAndAllDictionary{
    dBug("THINK", 6, "thUS started thinking")
    let newRoomsAndAllDictionary: RoomsAndAllDictionary = {}

    // create a dictionary of rooms and their spawns
    let roomsAndSpawns: RoomsAndSpawnsDictionary = {};
    for (let spawn in Game.spawns) {
      let roomName = Game.spawns[spawn].room.name
      if (Object.keys(roomsAndSpawns).includes(roomName)){
        newRoomsAndAllDictionary[roomName].spawns.push(spawn)
        roomsAndSpawns[roomName].push(spawn)
      }else{
        newRoomsAndAllDictionary[roomName] = { "spawns":[spawn], "creeps":[]}
        roomsAndSpawns[roomName] = [spawn]
      }
    }

    let roomsAndCreeps: RoomsAndCreepsDictionary = {};
    for (let creep in Game.creeps) {
      let roomName = Game.creeps[creep].memory.homeRoomName
      if (Object.keys(roomsAndCreeps).includes(roomName)) {
        roomsAndCreeps[roomName].push(creep)
      } else {
        roomsAndCreeps[roomName] = [creep]
      }
      // will already be created from above
      newRoomsAndAllDictionary[roomName].creeps.push(creep)
    }


    // dBug("THINK", 6, "Game.spawns:::" +JSON.stringify(Game.spawns))
    // dBug("THINK", 6, "roomsAndSpawns:::" +JSON.stringify(roomsAndSpawns))
    // dBug("THINK", 6, "roomsAndCreeps:::" +JSON.stringify(roomsAndCreeps))




    // let each room think for itself
    // which will then let it's spawns and creeps think for themselves
    for(let room in roomsAndSpawns){
      // roomsAndSpawns[room].length
      // dBug("THINK", 6, "room:::" + JSON.stringify(room))
      try{
        thinkForRoom(Game.rooms[room], roomsAndSpawns, roomsAndCreeps)
      }catch(e){
        dBug("THINK", 2, "Error thinking for room: "+ room)
        console.log(e)
      }
    }

    // dBug("THINK", 6, "Came up with new actionPlan"+JSON.stringify(newActionPlan))
    dBug("THINK", 6, "thUS finished thinking")
    return newRoomsAndAllDictionary;
  }









  // runActions(actionPlan: ActionPlan = {"spawns":[],"creeps":[]}){
  runActions(roomsDictionary: RoomsAndAllDictionary ){
    dBug("ACT", 6, "runActions: roomsDictionary ::: " + JSON.stringify(roomsDictionary))
    
    // const spawns = decideSpawnsToUse(actionPlan);
    if (Object.keys(roomsDictionary).length == 0){
      return 
    }
    // for (let spawn in actionPlan.spawns) {
    // for (let i = 0; i < Object.keys(roomsDictionary).length; i++) {
    for (let room in roomsDictionary) {
      // let theSpawn = Game.spawns[roomsDictionary[i].spawns];
      for (let spawn in roomsDictionary[room].spawns) {
      // for (let i = 0; i < roomsDictionary[room].spawns.length; i++) {
        let theSpawn = Game.spawns[roomsDictionary[room].spawns[spawn]]
        dBug("ACT", 4, "runActions: spawn ::: " + JSON.stringify(spawn))
        autoSpawn(theSpawn);
      }
      for (let creep in roomsDictionary[room].creeps) {
        // let theSpawn = Game.spawns[roomsDictionary[room].spawns[spawn]]
        let theCreep = Game.creeps[roomsDictionary[room].creeps[creep]]
        // continueTask 
        console.log(theCreep.name+" has nothing to do yet")
        dBug("ACT", 7, theCreep.name + " is about to act")
        workerGeneralDecisionTree(theCreep)
        // theCreep.moveTo(25, 24)
      }

    }


    dBug("ACT", 6, "Ran actions with plan")
  }







  
  // ActInRoom(agenda:RoomAgenda){
  //   let room = Game.rooms[agenda.roomName];
  //   agenda.spawnQueue;
  // }


  newTask(name: string, priority: number = 3): Task {
    let task = {
      name: name,
      priority: priority,
      finished: false,
    }
    return task;
  }







  




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

