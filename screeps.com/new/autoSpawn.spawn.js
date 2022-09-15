const configs = require("./main.config");


const spawnFromQueue = function (spawn) {
  let role = spawn.memory.spawnQueue[0];
  let newName = role + Game.time;
  // console.log(spawn.room.controller.level)
  console.log(configs['rcLevel_'+spawn.room.controller.level].bodyParts[role])

  let scheduled = spawn.spawnCreep(
    configs['rcLevel_'+spawn.room.controller.level].bodyParts[role],
    newName,
    {"memory": {"role": role}}
  );
  console.log("result of scheduling: " + scheduled)
  console.log('Working on a new ' + role + ': ' + newName + ", result :" + scheduled);
  // a "0" code means it was scheduled successfully
  if( scheduled == 0 ){
    spawn.memory.spawnQueue.shift();
  }
}

module.exports = spawnFromQueue;
