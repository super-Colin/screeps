import { configs } from 'main.config';

import { dBug } from "utils/debugLevels/debugLevels";




export const harvestEnergy = function (creep: Creep, useClosest:boolean = true):boolean{
  const taskType: CREEP_TASK_TYPE = "mine";
  const successStatusName: CREEP_TASK_STATUS = "mining";

  // If creep is just starting on this task it needs a target, not if it's full though
  if (
    creep.memory.task == "none"
    || creep.memory.task.taskType != taskType
    || creep.memory.taskStatus != successStatusName
    || creep.memory.taskBlocked == true
    || creep.memory.task.targetId == undefined
    ) {


    let closestByPath = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
    if (closestByPath == null) {
      creep.say('No ' + configs.emojis.resources.energy + ' to ' + configs.emojis.tasks.mine);
      creep.memory.taskStatus = "noTarget";
      creep.memory.taskBlocked = true;
      return false;
    }

    let newTaskUpdate: TASK_MINE = {
      taskType: "mine",
      resourceType: "energy",
      targetId: closestByPath.id,
      carryToStorage: true,
    }


    // Set a targetId for a source
    creep.say(configs.emojis.tasks.mine + 'ing ' + configs.emojis.resources.energy);
    if (useClosest) {
      dBug("ACT", 6, "setting "+ creep.name +"'s targetId for harvesting")
    } else { // if not useClosest
      let otherEnergySources = creep.room.find(FIND_SOURCES_ACTIVE, {
        filter: (source) => {
          return (source.id != closestByPath?.id);
        }
      });
      if (otherEnergySources.length > 0) {
        // pick a random source to use as target... I know it's bad..
        newTaskUpdate.targetId = otherEnergySources[Math.floor(Math.random() * otherEnergySources.length)].id;
        newTaskUpdate.targetIdBackup = closestByPath.id;
      } else {
        // still use closest as fallback in case
        newTaskUpdate.targetId = closestByPath.id;
      }
    }

    // Set new task update to memory
    creep.memory.task = newTaskUpdate;

  // If creep is already doing this job successfully, just keep it up 
  }
  
  

  // if the creep is full, stop harvesting
  if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
    creep.memory.taskStatus = "full";
    creep.memory.taskBlocked = true;
    return false;
  }



  let creepTarget = Game.getObjectById(creep.memory.task.targetId);
  if(creepTarget == null ){
    return false;
  }
  let workResult = creep.harvest(creepTarget);

  switch (workResult) {
    case OK:
      creep.memory.taskStatus = successStatusName;
      
      return true;
    case ERR_NOT_ENOUGH_RESOURCES:
      creep.memory.taskStatus = "blockedByTarget";
      creep.memory.taskBlocked = true;
      return false;
    // try to move to it
    case ERR_NOT_IN_RANGE:
      let walkResult = creep.moveTo(creepTarget, { visualizePathStyle: { stroke: configs.colors.paths.energy } });
      if (walkResult == ERR_NO_PATH) {
        creep.memory.taskBlocked = true
        return false;
      }
    case ERR_NO_BODYPART:
      creep.memory.taskStatus = "blocked";
      creep.memory.taskBlocked = true;
      creep.say("I can't "+ configs.emojis.tasks.mine +"!")
      return false;
  }
  return false;
}







