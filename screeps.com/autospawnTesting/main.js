const autoSpawningModule = require('./autoSpawn.module');
const roleHarvester = require('./role.harvester');


module.exports.loop = function () {

    const debugLevel = 1;

    // Place a line at the top of each tick's console log
    if (Game.time % 3 == 1) {
        console.log('-------~~- ~-~~~o~~~-~ -~~-------');
    } else if (Game.time % 3 == 2) {
        console.log('~--~~~~~-~ ~~~-----~~~ ~-~~~~~--~');
    } else {
        console.log('-~~--~---- ----------- ----~--~~-');
    }



    // Mem leak checker
    for (let name in Memory.creeps) {
        // console.log('mem leak');
        if (!Game.creeps[name]) {
            console.log('deleted role was ' + Memory.creeps[name].role);
            console.log('deleted roleNum was ' + Memory.creeps[name].roleNum);
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


    // AUTO SPAWNING CREEPS
    // ALSO HANDLES MEMORY LEAKS FOR DEAD CREEPS
    for(let spawn in Game.spawns){
        let currentRoomName = Game.spawns[spawn].room.name;
        let roomControllerLevel = 'rc' + Game.spawns[spawn].room.controller.level;

        console.log('main loop current spawn & room : ' + spawn + ' & ' + currentRoomName);

        autoSpawningModule(spawn, currentRoomName, roomControllerLevel, 2, debugLevel);

    }

    for(let creep in Game.creeps){
        const creepRef = Game.creeps[creep];
        switch(creepRef.memory.role){
            case 'harvester':
                if (debugLevel > 1) {console.log('harvester running');}
                roleHarvester.run(creepRef, debugLevel);
            break
        }
    }


}



