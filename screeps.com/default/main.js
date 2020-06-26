let roleHarvester = require('role.harvester');
let roleBuilder = require('role.builder');
let roleUpgrader = require('role.upgrader');
let roleTester = require('role.tester');
let roleRepairer = require('role.repairer');


module.exports.loop = function () {
    console.log('-------------- ~~~~~~ --------------');

    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    let testers = _.filter(Game.creeps, (creep) => creep.memory.role == 'tester');
    console.log('Harvesters: ' + harvesters.length);
    console.log('Upgraders: ' + upgraders.length);
    console.log('Builders: ' + builders.length);
    console.log('Tester? (s?): ' + testers.length);

    if (harvesters.length < 3) {
        let newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {
            memory: {
                role: 'harvester'
            }
        });
    } 
    else if (upgraders.length < 5) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'upgrader'
            }
        });
    } 
    else if (builders.length < 3) {
        let newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
            memory: {
                role: 'builder'
            }
        });
    } else if (testers.length < 4) {
        let newName = 'Tester' + Game.time;
        console.log('Spawning new tester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, {
            memory: {
                role: 'tester'
            }
        });
    }

    if (Game.spawns['Spawn1'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y, {
                align: 'left',
                opacity: 0.8
            });
    }

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            // roleRepairer.run(creep);
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