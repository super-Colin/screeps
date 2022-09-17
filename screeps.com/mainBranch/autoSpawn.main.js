const configs = require("./main.config");

const autoSpawnInit = require("./autoSpawn.init");
const deathChecker = require("./autoSpawn.deathChecker");
const jobFiller = require("./autoSpawn.jobFiller");
const spawnFromQueue = require("./autoSpawn.spawn");

const harvesterBodyParts = require("./role.harvester.bodyParts");
// const jobFiller = require("./harvester.main");


const autoSpawn = function (spawn) {
  const controllerLevel = spawn.room.controller.level;
  const jobs = configs['rcLevel_'+controllerLevel].jobs;  

  // Initial setup for a new base
  if(spawn.memory.spawnQueue == undefined){
    autoSpawnInit(spawn, jobs);
  }

  // checks for dead creeps that may not have been deleted somehow
  deathChecker();


  // if there are units in the spawn queue then keep spawning them
  if(spawn.memory.spawnQueue.length > 0){
    spawnFromQueue(spawn);
  }else{
    // otherwise check if we should add to the queue
    jobFiller(spawn, jobs);
  }
}

module.exports = autoSpawn;

