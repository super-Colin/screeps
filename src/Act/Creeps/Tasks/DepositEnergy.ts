import { configs } from 'main.config';

import { dBug } from "utils/debugLevels/debugLevels";
import { addDepositToRoomLogistics } from 'utils/OngoingCount';





export const depositEnergy = function (creep: Creep, useClosest: boolean = true): boolean {
  const taskType: CREEP_TASK_TYPE = "transfer";
  const successStatusName: CREEP_TASK_STATUS = "transfering";

  // If creep is just starting on this task it needs a target, not if it's full though
  if (
    creep.memory.task == "none"
    || creep.memory.task.taskType != taskType
    || creep.memory.taskStatus != successStatusName
    || creep.memory.taskBlocked == true
  ) {



    //Pick a target to store the energy in
    var energyStores = creep.room.find(FIND_MY_STRUCTURES, {
      filter: (structure) => {
        return (
          structure.structureType == STRUCTURE_EXTENSION ||
          // structure.structureType == STRUCTURE_CONTAINER ||
          structure.structureType == STRUCTURE_STORAGE ||
          structure.structureType == STRUCTURE_TOWER ||
          structure.structureType == STRUCTURE_SPAWN) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }
    });


    let closestByPath = creep.pos.findClosestByPath(energyStores)
    dBug("ACT", 8, "closest energy store out of " + energyStores.length +" to " + creep.name + " is : " + JSON.stringify(closestByPath))
    if (closestByPath == null) {
      creep.memory.taskStatus = "noTarget";
      creep.memory.taskBlocked = true;
      return false;
    }


    let newTransferTask: TASK_TRANSFER ={
      taskType: "transfer",
      fromTargetId: "self",
      toTargetId: closestByPath.id,
      resourceType: "energy",
    } 

    // toDO
    // need to filter out the closest if really want to
    if (energyStores.length == 2) {
      newTransferTask.toTargetId = energyStores[1].id;
    } else if (energyStores.length > 2) {
      // pick a random store to use as target... I know it's bad.. hit any but the first 
      newTransferTask.toTargetId = energyStores[Math.floor(Math.random() * (energyStores.length - 1)) + 1].id;
    };


    creep.memory.task = newTransferTask;

  }//if already has a target


  // if the creep is empty, stop storing
  const energyCarried = creep.store.getUsedCapacity(RESOURCE_ENERGY);
  if (energyCarried == 0) {
    creep.memory.taskStatus = "done";
    return false;
  } // ... else

  let creepTarget = Game.getObjectById(creep.memory.task.toTargetId);
  if(creepTarget == null){return false}

  let workResult = creep.transfer(creepTarget, RESOURCE_ENERGY);

  switch (workResult) {
    case OK:
      // energyCarried
      // addDepositToRoomLogistics(room, energyCarried)
      addDepositToRoomLogistics(creep.memory.homeRoomName, energyCarried)
      creep.memory.taskStatus = successStatusName;
      return true;
    case ERR_NOT_ENOUGH_RESOURCES:
      creep.memory.taskStatus = "done";
      return false;
    case ERR_FULL:
      creep.memory.taskStatus = "blockedByTarget";
      creep.memory.taskBlocked = true;
      return false;
    // try to move to it
    case ERR_NOT_IN_RANGE:
      let walkResult = creep.moveTo(creepTarget, { visualizePathStyle: { stroke: configs.colors.paths.energy } });
      if (walkResult == ERR_NO_PATH) {
        creep.memory.taskStatus = "blocked";
        return false;
      }
      creep.memory.taskStatus = successStatusName;
      return true;
  }

  console.log("Returning default FALSE in task: storeEnergy");
  return false;






}
