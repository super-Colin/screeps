const configs = require("./main.config");


const spawnFromQueue = function (spawn) {
  let role = spawn.memory.spawnQueue[0];
  let newName = role + Game.time;
  // console.log(spawn.room.controller.level)

  let scheduled = spawn.spawnCreep(
    configs['rcLevel_'+spawn.room.controller.level].bodyParts[role],
    newName,
    {"memory": {"role": role, "homeSpawnId":spawn.id}}
  );
  console.log('Working on a new ' + role + ': ' + newName + ", result :" + scheduled);
  switch(scheduled){
    case 0:// OK
      spawn.memory.spawnQueue.shift();
      console.log(configs['rcLevel_'+spawn.room.controller.level].bodyParts[role])
      break;

    case -6: // ERR_NOT_ENOUGH_RESOURCES
      // Try to spawn a less advanced one in case we don't have enough energy storage
      if(spawn.room.controller.level == 2){
        scheduled = spawn.spawnCreep(
          // configs['rcLevel_'+ (spawn.room.controller.level - 1)].bodyParts[role],
          configs['rcLevel_1'].bodyParts[role],
          newName,
          {"memory": {"role": role}}
        );
        if(scheduled == 0){
          spawn.memory.spawnQueue.shift();
          console.log(configs['rcLevel_1'].bodyParts[role])
        }
      }
      break;

  }
}

module.exports = spawnFromQueue;
