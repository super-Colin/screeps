let roleHarvester = require('role.harvester');
let roleBuilder = require('role.builder');
let roleUpgrader = require('role.upgrader');
let roleTester = require('role.tester');


module.exports.loop = function () {
    console.log('-------------- ~~~~~~ --------------');

    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            // console.log('deleted role was ' + name.memory.role);
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    // console.log(RawMemory);

    Memory.creepRoles = {
        harvesters: 3,
        upgraders: 4,
        builders: 4,
        testers: 5,
    };

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    let testers = _.filter(Game.creeps, (creep) => creep.memory.role == 'tester');
    console.log('Harvesters: ' + harvesters.length + ' / ' + Memory.creepRoles.harvesters);
    console.log('Upgraders: ' + upgraders.length + ' / ' + Memory.creepRoles.upgraders);
    console.log('Builders: ' + builders.length + ' / ' + Memory.creepRoles.builders);
    console.log('Testers: ' + testers.length + ' / ' + Memory.creepRoles.testers);


    if (harvesters.length < Memory.creepRoles.harvesters) {
        let newName = 'Harvester' + Game.time;
        console.log('Working on a new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, {
            memory: {role: 'harvester'}
        });
    } 
    else if (upgraders.length < Memory.creepRoles.upgraders) {
        let newName = 'Upgrader' + Game.time;
        // let newName = 'Upgrader' + upgraders.length;
        console.log('Working on a new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
            memory: { role: 'upgrader'}
        });
    } 
    else if (builders.length < Memory.creepRoles.builders) {
        let newName = 'Builder' + Game.time;
        console.log('Working on a new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
            memory: {role: 'builder'}
        });
    } else if (testers.length < Memory.creepRoles.testers) {
        let newName = 'Tester' + Game.time;
        console.log('Working on a new tester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {
            memory: {role: 'tester'}
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