
const autoSpawnInit = function (spawn, jobs) {
  // Initial setup of a spawn queue for a new spawner
  spawn.memory.spawnQueue =[];
  // push an extra harvester to the top
  spawn.memory.spawnQueue.push( "harvester" );
  spawn.memory.spawning = "harvester";
  // push one of each role for this level into the queue
  for(let role in jobs){
    spawn.memory.spawnQueue.push(role);
  }
}


module.exports = autoSpawnInit;