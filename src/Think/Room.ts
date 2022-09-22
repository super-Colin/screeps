import { configs } from 'main.config';
import { dBug } from "utils/debugLevels/debugLevels";
import { startOngoingCount, updateOngoingCount } from "utils/OngoingCount"
import { planCreep } from "./Generate/Creep/Body";




export const thinkForRoom = function (theRoom:Room, spawnsDictionary: RoomsAndSpawnsDictionary, creepsDictionary: RoomsAndCreepsDictionary): void {
  if (theRoom.controller == undefined) {
    return;
  }

  // init logistics memory if needed
  if (theRoom.memory.logistics == undefined){
    theRoom.memory.logistics= {
      energyIncome: 0,
      energyOutflow: 0,
      defenseLevel: 0,
      calculations: {
        energyIncome: startOngoingCount(configs.ticksBetweenRoomIncomeFullUpdate, theRoom.energyAvailable)
      }
    }
  }else{
    // keep logistics running for the room
    updateEnergyIncome(theRoom);
  }


  // Think for spawns and add to spawn queue if needed
  if (Game.time % configs.ticksBetweenRoomSpawnCheck == 0){
    // with energy income decide if more workers are needed
    dBug("THINK", 5, "configs.minimumDesiredEnergyIncome:::" + configs.minimumDesiredEnergyIncome)
    dBug("THINK", 5, "configs.minimumDesiredEnergyIncome:::" + (configs.minimumDesiredEnergyIncome_perControllerLvl * theRoom.controller.level))
    if(theRoom.memory.logistics.energyIncome < configs.minimumDesiredEnergyIncome
    || theRoom.memory.logistics.energyIncome < (configs.minimumDesiredEnergyIncome_perControllerLvl * theRoom.controller.level)){
      // if we have less than desired income

      // generate a creep to add to the spawn queue
      // go ahead and make a general creep blueprint since we may add multple
      let generalCreep = planCreep("general", theRoom.energyCapacityAvailable);
      let roomSpawnQueue = [];
      switch (theRoom.controller.level){
        case 5 :
          roomSpawnQueue.push(planCreep("miner", theRoom.energyCapacityAvailable))
          roomSpawnQueue.push(planCreep("mover", theRoom.energyCapacityAvailable))
          roomSpawnQueue.push(generalCreep)
          roomSpawnQueue.push(planCreep("builder", theRoom.energyCapacityAvailable))
          break;

        case 4 :
          roomSpawnQueue.push(planCreep("builder", theRoom.energyCapacityAvailable))
          roomSpawnQueue.push(generalCreep, generalCreep)
          roomSpawnQueue.push(planCreep("dMelee", theRoom.energyCapacityAvailable))
          break;

        case 3 :
          roomSpawnQueue.push(generalCreep, generalCreep)
          roomSpawnQueue.push(planCreep("builder", theRoom.energyCapacityAvailable))
          break;

        default:
          roomSpawnQueue.push(generalCreep, generalCreep)
      }// after creating a new spawn queue for the room
      dBug("THINK", 5, "adding to room spawn queue:::" +theRoom.name+":::" + JSON.stringify(roomSpawnQueue))
      // spread the spawn queue to the spawns this room
      while (roomSpawnQueue.length > 0){
        // spread the queue among all the spawns in this room
        for (let i =0; i < spawnsDictionary[theRoom.name].length; i++){
          if (roomSpawnQueue.length > 0 ){
            let toPush = roomSpawnQueue.pop();
            if (toPush !== false && toPush !== true && toPush !== undefined){
              if (Game.spawns[spawnsDictionary[theRoom.name][i]].memory.spawnQueue == undefined){
                Game.spawns[spawnsDictionary[theRoom.name][i]].memory.spawnQueue = [toPush]
              } else if (Game.spawns[spawnsDictionary[theRoom.name][i]].memory.spawnQueue.length < 3){
                Game.spawns[spawnsDictionary[theRoom.name][i]].memory.spawnQueue.push(toPush);
              }
            }
          }
        }
      }// after spreading the queue to the spawns

    }// if we didn't actually need to add to the spawn queue
    dBug("THINK", 5, "Don't need to add to spawn queue for room "+ theRoom.name)

  }// else don't try to add to the spawn queue...



  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // let the creeps figure out their duties
  // for (let i = 0; i < creepsDictionary[theRoom.name].length; i++) {
  for (let creep in creepsDictionary[theRoom.name]) {
    // Game.creeps[creep].think()
    console.log(creep)

  }



}



export const updateEnergyIncome = function (theRoom:Room) {
  // check if we should do a calc update
  if (Game.time % configs.ticksBetweenRoomIncomeCheck == 0 && theRoom.memory.logistics != undefined){
    updateOngoingCount(theRoom.memory.logistics.calculations.energyIncome, theRoom.energyAvailable);
    theRoom.memory.logistics.energyIncome = theRoom.memory.logistics.calculations.energyIncome.runningAverage;
    dBug("MEMORY", 6, "Updated energy income average for room " + theRoom.name + ', new average is ' + theRoom.memory.logistics.energyIncome +", over "+ theRoom.memory.logistics.calculations.energyIncome.tickUpdateFrequency +" ticks");
  }//else do nothing
}






