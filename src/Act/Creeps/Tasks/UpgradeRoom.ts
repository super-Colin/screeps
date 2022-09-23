import { configs } from 'main.config';

import { dBug } from "utils/debugLevels/debugLevels";



export const upgradeRoom = function(creep:Creep):boolean {
  const taskType: CREEP_TASK_TYPE = "upgrade";
  const successStatusName: CREEP_TASK_STATUS = "upgrading";


  if (creep.room.controller == undefined){
    creep.memory.taskStatus = "noTarget"
    return false;
  }


  if (creep.memory.taskStatus != successStatusName) {
    creep.memory.taskStatus = "upgrading"
    creep.say('⚡️ Upgrading Room');
  }





  let upgraded = creep.upgradeController(creep.room.controller);
  switch (upgraded) {
    case OK:
      creep.memory.taskStatus = "upgrading";
      return true;
    case ERR_NOT_IN_RANGE:
      let walkResult = creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: configs.colors.paths.upgrade } });
      if (walkResult == ERR_NO_PATH) {
        creep.memory.taskStatus = "blocked";
        return false;
      }
      creep.memory.taskStatus = "upgrading";
      return true;
    case ERR_NOT_ENOUGH_RESOURCES:
      creep.memory.taskStatus = "empty";
      return false;
  }

  return false
}















