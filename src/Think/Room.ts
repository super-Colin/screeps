import { dBug } from "utils/debugLevels/debugLevels";
import { startOngoingCount, updateOngoingCount } from "utils/OngoingCount"
import { planCreep } from "./Generate/Creep/Body";




Room.prototype.think = function (spawnsDictionary: RoomsAndSpawnsDictionary, creepsDictionary: RoomsAndCreepsDictionary): void {
  if (this.controller == undefined) {
    return;
  }

  // init logistics memory if needed
  if (this.memory.logistics == undefined){
    this.memory.logistics= {
      energyIncome: 0,
      energyOutflow: 0,
      defenseLevel: 0,
      calculations: {
        energyIncome: startOngoingCount(configs.ticksBetweenRoomIncomeFullUpdate, this.energyAvailable)
      }
    }
  }else{
    // keep logistics running for the room
    this.updateEnergyIncome();
  }


  // Think for spawns and add to spawn queue if needed
  if (Game.time % configs.ticksBetweenRoomSpawnCheck == 0){
    // with energy income decide if more workers are needed
    if(this.memory.logistics.energyIncome < configs.minimumDesiredEnergyIncome
    || this.memory.logistics.energyIncome < (configs.minimumDesiredEnergyIncome_perControllerLvl * this.controller.level)){
      // if we have less than desired income

      // generate a creep to add to the spawn queue
      // go ahead and make a general creep blueprint since we may add multple
      let generalCreep = planCreep("general", this.energyCapacityAvailable);
      let roomSpawnQueue = [];
      switch (this.controller.level){
        case 5 :
          roomSpawnQueue.push(planCreep("miner", this.energyCapacityAvailable))
          roomSpawnQueue.push(planCreep("mover", this.energyCapacityAvailable))
          roomSpawnQueue.push(generalCreep)
          roomSpawnQueue.push(planCreep("builder", this.energyCapacityAvailable))
          break;

        case 4 :
          roomSpawnQueue.push(planCreep("builder", this.energyCapacityAvailable))
          roomSpawnQueue.push(generalCreep, generalCreep)
          roomSpawnQueue.push(planCreep("dMelee", this.energyCapacityAvailable))
          break;

        case 3 :
          roomSpawnQueue.push(generalCreep, generalCreep)
          roomSpawnQueue.push(planCreep("builder", this.energyCapacityAvailable))
          break;

        default:
          roomSpawnQueue.push(generalCreep, generalCreep)
      }// after creating a new spawn queue for the room

      // spread the spawn queue to the spawns this room
      while (roomSpawnQueue.length > 0){
        // spread the queue among all the spawns in this room
        for (let i =0; i < spawnsDictionary[this.name].length; i++){
          if (roomSpawnQueue.length > 0 ){
            let toPush = roomSpawnQueue.pop();
            if (toPush !== false && toPush !== true && toPush !== undefined){
              Game.spawns[spawnsDictionary[this.name][i]].memory.spawnQueue.push(toPush);
            }
          }
        }
      }// after spreading the queue to the spawns

    }// if we didn't actually need to add to the spawn queue

  }// else don't try to add to the spawn queue...



  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // let the creeps figure out their duties
  // for (let i = 0; i < creepsDictionary[this.name].length; i++) {
  for (let creep in creepsDictionary[this.name]) {
    Game.creeps[creep].think()
  }



}



Room.prototype.updateEnergyIncome = function () {
  // check if we should do a calc update
  if (Game.time % configs.ticksBetweenRoomIncomeCheck == 0 && this.memory.logistics != undefined){
    updateOngoingCount(this.memory.logistics.calculations.energyIncome, this.energyAvailable);
    this.memory.logistics.energyIncome = this.memory.logistics.calculations.energyIncome.runningAverage;
    dBug("MEMORY", 6, "Updated energy income average for room " + this.name + ', new average is ' + this.memory.logistics.energyIncome +", over "+ this.memory.logistics.calculations.energyIncome.tickUpdateFrequency +" ticks");
  }//else do nothing
}






