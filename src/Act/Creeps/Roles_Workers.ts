import { harvestEnergy } from "./Tasks/harvestEnergy";







export const workerGeneralBehavior = function(creep:Creep){
  initWorkerCreepMemory(creep);
  workerGeneralDecisionTree(creep);
}



function initWorkerCreepMemory(creep: Creep){
  if(creep.memory.task == "none"){
    creep.memory.task
  }
}

function workerGeneralDecisionTree(creep: Creep){
  switch(creep.memory.role){
    case "mover":

    case "miner":

    case "builder":
    
    case "general":
    default:
      harvestEnergy(creep)
  }

}










