import { depositEnergy } from "./Tasks/DepositEnergy";
import { harvestEnergy } from "./Tasks/harvestEnergy";
import { upgradeRoom } from "./Tasks/UpgradeRoom";







export const workerGeneralDecisionTree = function(creep:Creep){


  switch (creep.memory.role) {
    case "mover":

    case "miner":

    case "builder":

    case "general":
      // if already upgrading keep doing that 
      if (creep.memory.taskStatus == "upgrading"){
        upgradeRoom(creep);
      // if full try to deposit it
      } else if (creep.memory.taskStatus == "full") {
        if (!depositEnergy(creep)) {
          // if nowhere to start depositing then start upgrading
          upgradeRoom(creep);
        }
      }
    default:
      harvestEnergy(creep);
  }


}













