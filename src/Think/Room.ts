import { dBug } from "utils/debugLevels/debugLevels";
import { startOngoingCount, updateOngoingCount } from "utils/OngoingCount"




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
        energyIncome: startOngoingCount(configs.ticksBetweenRoomIncomeCheck, this.energyAvailable)
      }
    }
  }else{
    this.updateEnergyIncome();
  }

  // with energy income decide if more workers are needed


  if(this.memory.logistics.energyIncome < configs.minimumDesiredEnergyIncome
  || this.memory.logistics.energyIncome < (configs.minimumDesiredEnergyIncome_perControllerLvl * this.controller.level)){

  }

}



Room.prototype.updateEnergyIncome = function () {
  // check if we should do a calc update
  if (Game.time % configs.ticksBetweenRoomIncomeCheck == 0 && this.memory.logistics != undefined){
    updateOngoingCount(this.memory.logistics.calculations.energyIncome, this.energyAvailable);
    this.memory.logistics.energyIncome = this.memory.logistics.calculations.energyIncome.runningAverage;
    dBug("MEMORY", 6, "Updated energy income average for room " + this.name + ', new average is ' + this.memory.logistics.energyIncome);
  }//else do nothing
}






