import { configs } from 'main.config';

import { dBug } from "utils/debugLevels/debugLevels";
import { addDepositToRoomLogistics } from 'utils/OngoingCount';



export const upgradeRoom = function(creep:Creep):boolean {
  const taskType: CREEP_TASK_TYPE = "upgrade";
  const successStatusName: CREEP_TASK_STATUS = "upgrading";

  if (
    creep.memory.task == "none"
    || creep.memory.task.taskType != taskType
    || creep.memory.taskStatus != successStatusName
    || creep.memory.taskBlocked == true
  ) {

  }






  if (creep.room.controller == undefined){
    creep.memory.taskStatus = "noTarget"
    creep.say("💥 No Target")
    return false;
  }


  // if (creep.memory.taskStatus != successStatusName) {
  //   creep.memory.taskStatus = "upgrading"
  //   creep.say('⚡️ Upgrading Room');
  // }





  // let energyBeforeUpgrade = creep.store.getUsedCapacity("energy");
  let energyBeforeUpgrade = creep.memory.resourcesLastTick.energy
  console.log("energyBeforeUpgrade " + energyBeforeUpgrade)
  let upgraded = creep.upgradeController(creep.room.controller);

  switch (upgraded) {
    case OK:
      if (creep.memory.taskStatus == "upgrading"){
        let energyAfterUpgrade = creep.store.getUsedCapacity("energy");
        console.log("energyAfterUpgrade " + energyAfterUpgrade)
        let energyPutInToController = energyBeforeUpgrade - energyAfterUpgrade;
        console.log("energyPutInToController " + energyPutInToController)
        creep.say("Added " + energyPutInToController + " "+ configs.emojis.resources.energy)
        addDepositToRoomLogistics(creep.memory.homeRoomName, energyPutInToController)
      }
      creep.memory.resourcesLastTick.energy = creep.store.getUsedCapacity("energy")
      creep.memory.taskStatus = "upgrading";
      creep.memory.taskBlocked = false;
      return true;
    case ERR_NOT_IN_RANGE:
      creep.memory.resourcesLastTick.energy = creep.store.getUsedCapacity("energy")
      let walkResult = creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: configs.colors.paths.upgrade } });
      if (walkResult == ERR_NO_PATH) {
        creep.memory.taskBlocked = true;
        return false;
      }
      creep.memory.taskStatus = "upgrading";
      creep.memory.taskBlocked = false;
      return true;
    case ERR_NOT_ENOUGH_RESOURCES:
      creep.memory.taskStatus = "empty";
      creep.memory.taskBlocked = true;
      return false;
  }

  return false
}















