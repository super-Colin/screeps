const autoSpawn = require('./autoSpawn.module');

const roleHarvester = require('role.harvester');
const roleBuilder = require('role.builder');
const roleUpgrader = require('role.upgrader');
const roleTester = require('role.tester');


module.exports.loop = function () {

    // CONSOLE LOGGING A LINE BEWTEEN TICKS
    if(Game.time % 3 == 1){
        console.log('-------~~- ~-~~~o~~~-~ -~~-------');
    } else if (Game.time % 3 == 2) {
        console.log('~--~~~~~-~ ~~~-----~~~ ~-~~~~~--~');
    } else {
        console.log('-~~--~---- ----------- ----~--~~-');
    }


    // AUTO SPAWNING FOR EACH SPAWN
    let ticksBetweenDeathChecks = 2;
    for(let spawn in Game.spawns){
        let roomSpawnIsIn = Game.spawns[spawn].room.name;
        // console.log(spawn);
        // console.log(roomSpawnIsIn);
        autoSpawn(spawn, roomSpawnIsIn, ticksBetweenDeathChecks);
    }




    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'tester') {
            roleTester.run(creep);
            // roleBuilder.run(creep);
        }
    }
    
}