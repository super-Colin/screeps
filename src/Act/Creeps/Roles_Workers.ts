import { configs } from "main.config";
import { dBug } from "utils/debugLevels/debugLevels";
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
      if (creep.memory.taskStatus == "upgrading" ){
        dBug("ACT", 8, creep.name +" is continuing to upgrade")
        creep.say(configs.emojis.tasks.upgrade + " Default")
        if(upgradeRoom(creep)){
          return
        }
      // if full try to deposit it
      } else {
        if (creep.memory.taskStatus == "full" || creep.memory.taskStatus == "transfering") {
          if (!depositEnergy(creep)) {
            creep.say(configs.emojis.tasks.Store + " Failed " + configs.emojis.tasks.upgrade)
            // if nowhere to start depositing then start upgrading
            upgradeRoom(creep);
          }
        }
      }

    default:
      if (
        creep.memory.taskStatus == "mining"
        || creep.memory.taskStatus == "none" 
        || creep.memory.taskStatus == "empty" 
        || creep.memory.taskStatus == "done"
        || creep.memory.taskStatus == "blocked"
        || creep.memory.taskStatus == "noTarget"
        || creep.memory.taskBlocked == true
        && creep.memory.taskStatus != "transfering"
      ){
        creep.say(configs.emojis.tasks.mine + " Default")
        harvestEnergy(creep);
        return
      }
      creep.say(configs.emojis.error + " Default")
      dBug("ACT", 1, creep.name + " has nothing to do with current status")

  }


}













