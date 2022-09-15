const configs = require("../main.config");

const autoSpawn = require('./autoSpawn.module');

const roleHarvester = require('role.harvester/harvester.main');





const roleBuilder = require('role.builder');
const roleUpgrader = require('role.upgrader');
const roleTester = require('role.tester');


module.exports.loop = function () {

    // CONSOLE LOGGING A LINE BEWTEEN TICKS
    if(Game.time % 3 == 1){
        console.log('-------~~- ~-~~~O~~~-~ -~~-------');
    } else if (Game.time % 3 == 2) {
        console.log('~--~~~~~-~ ~~~o---o~~~ ~-~~~~~--~');
    } else {
        console.log('o~~--~o--- ----------- ---o~--~~o');
    }


    // AUTO SPAWNING FOR EACH SPAWN
    for(let spawn in Game.spawns){
        let roomSpawnIsIn = Game.spawns[spawn].room.name;
        autoSpawn(spawn, roomSpawnIsIn, configs.ticksBetweenDeathCheck);
    }




    // Creep behavior
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