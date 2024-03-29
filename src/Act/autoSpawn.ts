
import { configs } from 'main.config';
import { dBug } from '../utils/debugLevels/debugLevels';



// const jobFiller = (spawn: StructureSpawn, jobs) => {
// // const jobFiller = (spawn, jobs) => {

//   // check we have as many of each role as we should
//   for (let role in jobs) {
//     let inRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
//     console.log(role + 's: ' + inRole.length + ' / ' + jobs[role]);
//     // if there is less than the number of a role than specified in configs, make more
//     if (inRole.length < jobs[role]) {
//       console.log("need more: " + role + "s, adding 1 to spawn queue for spawn: " + spawn.name);
//       spawn.memory.spawnQueue.push(role);
//     }
//   }
// }



const spawnFromQueue = function(spawn: StructureSpawn): boolean {
  dBug("SPAWN", 8, "Trying to spawn from queue")
  spawn.memory.spawnQueue ??= []
  if ( spawn.memory.spawnQueue.length == 0 || spawn.memory.spawnQueue[0] == undefined ){
    return true; // success, just nothing to do
  }
  const queuedCreep = spawn.memory.spawnQueue[0]
  let newName = queuedCreep.role + "_" + Game.time;

  // init creep task memory
  let scheduled = spawn.spawnCreep(
    queuedCreep.bodyParts,
    newName,
    {
      "memory": {
        "role": queuedCreep.role,
        "homeRoomSpawn": spawn.name,
        "homeRoomName": spawn.room.name,
        "thinking":false,
        "thoughts":{},
        "task": "none",
        "taskStatus": "none",
        "taskBlocked": false,
        "resourcesLastTick": {energy:0},
      }
    }
  );
  dBug("SPAWN", 7, ('Working on a new creep: ' + newName + ", result : " + scheduled) )
  switch (scheduled) {
    case OK:
      spawn.memory.spawnQueue.shift();
      dBug("SPAWN", 5, ('Sucessfully scheduled new creep '+ queuedCreep.name +' in room '+ spawn.room.name) )
      return true;

    case ERR_NOT_ENOUGH_RESOURCES: 
      // Try to spawn a less advanced one in case we don't have enough energy storage
      // TODO
      // if (spawn.memory.feelings.needWorkers && queuedCreep.role == WORKER_ROLE) {
        // check there's enough energy in the room to spawn it with these parts

      dBug("SPAWN", 8, ('Not enough resources yet to spawn: ' + queuedCreep.name))
      break;

  }
  return false;
}






export const autoSpawn = function(spawn: StructureSpawn):boolean{
  if(spawn == undefined){
    dBug("SPAWN", 2, 'ERROR ::: autospawn passed undefined ')
    return false;
  }
  dBug("SPAWN", 6, 'Starting autospawn loop for : ' + spawn.name)
  // Initialize Memory for a new spawn
  // spawn.memory.roomName ??= spawn.room.name;
  spawn.room.memory.spawns ??=[spawn.name]
  spawn.room.memory.spawns.includes(spawn.name) ? '' : spawn.room.memory.spawns.push(spawn.name)
  spawn.memory.isMainInRoom ??= true;
  spawn.memory.isHub ??= false;
  spawn.memory.feelings??={
    needWorkers:true
  }
  spawn.memory.thoughts ??= {};

  spawn.memory.spawnQueue ??= [];
  
  // const controllerLevel = spawn.room.controller.level;
  // const jobs = configs['rcLevel_' + controllerLevel].jobs;

  // check for dead creeps that may not have been deleted somehow
  if (Game.time % configs.ticksBetweenDeathCheck === 0) {
    for (let name in Memory.creeps) {
      if (!Game.creeps[name]) {
        // Remove from memory in room as well
        let homeRoomMemory = Memory.rooms[Memory.creeps[name].homeRoomName]
        if ( homeRoomMemory.creeps?.includes(name) ){
          homeRoomMemory.creeps = homeRoomMemory.creeps?.filter((c)=>{return c != name})
          console.log('Cleared non-existing creep from room ' + Memory.creeps[name].homeRoomName +'memory: ', name);
        }
        delete Memory.creeps[name];
        console.log('Cleared non-existing creep from global memory: ', name);
      }
    }
  }

  // if there are units in the spawn queue then keep spawning them
  if (spawn.memory.spawnQueue.length > 0) {
    return spawnFromQueue(spawn);

  } else {
    return false;
  }
}





