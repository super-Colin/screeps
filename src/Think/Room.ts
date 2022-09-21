import { dBug } from "utils/debugLevels/debugLevels";
import { startOngoingCount, updateOngoingCount } from "utils/OngoingCount"
import { planCreep } from "./Generate/Creep/Body";




Room.prototype.think = function (): void {
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
    this.updateEnergyIncome();
  }

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
      }
    }
    
  }// else don't try to make a new spawn queue





}



Room.prototype.updateEnergyIncome = function () {
  // check if we should do a calc update
  if (Game.time % configs.ticksBetweenRoomIncomeCheck == 0 && this.memory.logistics != undefined){
    updateOngoingCount(this.memory.logistics.calculations.energyIncome, this.energyAvailable);
    this.memory.logistics.energyIncome = this.memory.logistics.calculations.energyIncome.runningAverage;
    dBug("MEMORY", 6, "Updated energy income average for room " + this.name + ', new average is ' + this.memory.logistics.energyIncome +", over "+ this.memory.logistics.calculations.energyIncome.tickUpdateFrequency +" ticks");
  }//else do nothing
}






