const configs = require("./main.config");



export const harvestEnergy = function (creep: Creep, useClosest:boolean = true):boolean{

  // If creep is just starting on this task find a target
  if (
    creep.memory.task.status != "harvesting" 
    || creep.memory.task.blocked == true 
    || creep.memory.targetId == undefined
  ) {
    creep.memory.task.name = "harvestEnergy";
    // creep.memory.status = "harvesting";


    let closestByPath = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
    if (closestByPath == null) {
      creep.say('No '+ configs.emojis.resources.energy +' :(');
      creep.memory.task.blocked = true;
      return false;
    }




  // If creep is already doing this job, just keep it up 
  }else if(
    creep.memory.task.status == "harvesting"
    && creep.memory.task.blocked == false
    && creep.memory.targetId != undefined
  ){

  }
  return false;
}







