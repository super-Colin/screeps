import { depositEnergy } from "./Tasks/DepositEnergy";
import { harvestEnergy } from "./Tasks/harvestEnergy";







export const workerGeneralDecisionTree = function(creep:Creep){


  switch (creep.memory.role) {
    case "mover":

    case "miner":

    case "builder":

    case "general":
      if (creep.memory.taskStatus == "full"){
        depositEnergy(creep);
      }
    default:
      harvestEnergy(creep);
  }


}













