function autoSpawn(spawnName, ticksBetweenChecks = 5){

    // Check for memory leaks every ~5 ticks
    if(Game.time % ticksBetweenChecks === 0){
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                // console.log('deleted role was ' + name.memory.role);
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }

    let currentSpawner = Game.spawns[spawnName];


    Memory.creepRoles[currentSpawner.name] = {
        harvesters: {
            roleName: 'harvester',
            numberToMaintain: 3,
            numberAliveNow
        },
        upgraders: [4, 0, 'upgrader'],
        builders: [5, 0, 'builder'],
        testers: [5, 0, 'tester']
    };
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Harvesters: ' + harvesters.length + ' / ' + Memory.creepRoles.harvesters);
    console.log('Upgraders: ' + upgraders.length + ' / ' + Memory.creepRoles.upgraders);

    for(let role in Memory.creepRoles[currentSpawner.name]){
        role[0]
    }


    if (harvesters.length < Memory.creepRoles.harvesters) {
        let role = 'harvester';
        console.log('Working on a new : ' + role);
        currentSpawner.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], (role + Game.time), {
            memory: {
                role: 'harvester'
            }
        });
    }
    else if (upgraders.length < Memory.creepRoles.upgraders) {
        let role = 'upgrader';
        console.log('Working on a new : ' + role);
        currentSpawner.spawnCreep([WORK, WORK, CARRY, MOVE], (role + Game.time), {
            memory: {
                role: 'upgrader'
            }
        });
    }
    else if (builders.length < Memory.creepRoles.builders) {
        let newName = 'Builder' + Game.time;
        console.log('Working on a new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
            memory: {
                role: 'builder'
            }
        });
    }
    else if (testers.length < Memory.creepRoles.testers) {
        let newName = 'Tester' + Game.time;
        console.log('Working on a new tester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, {
            memory: {
                role: 'tester'
            }
        });
    }
}