






export const workerGeneralBehavior = function(creep:Creep){
  initWorkerCreepMemory(creep);

}



function initWorkerCreepMemory(creep: Creep){
  if(creep.memory.task.name == "none"){
    creep.memory.task
  }
}

function workerGeneralDecisionTree(role: CREEP_ROLE_WORKER){
  switch(role){
    case "mover":

    case "miner":

    case "builder":
    
    case "general":
    default:
      // harvestEnergy()
  }

}










