const autoSpawningModule = require('./autoSpawn.module');
const roleHarvester = require('./role.harvester');


module.exports.loop = function () {

    const debugLevel = 3;
    const ticksBetweenChecks = 3;

    // Place a line at the top of each tick's console log
    if (Game.time % 3 == 1) {
        console.log('-------~~- ~-~~~o~~~-~ -~~-------');
    } else if (Game.time % 3 == 2) {
        console.log('~--~~~~~-~ ~~~-----~~~ ~-~~~~~--~');
    } else {
        console.log('-~~--~---- ----------- ----~--~~-');
    }



    // AUTO SPAWNING CREEPS
    // ALSO HANDLES MEMORY LEAKS FOR DEAD CREEPS
    for(let spawn in Game.spawns){

        // DEFINE OUR CURRENT ROOM NAME AND RC LEVEL AS STRINGS
        let currentRoomName = Game.spawns[spawn].room.name;
        let roomControllerLevel = 'rc' + Game.spawns[spawn].room.controller.level;

        if (debugLevel > 0){console.log('main loop current spawn & room : ' + spawn + ' & ' + currentRoomName);}

        // RUN OUR AUTO SPAWN MODULE FOR THIS SPAWN AT THIS ROOM LEVEL
        autoSpawningModule(spawn, currentRoomName, roomControllerLevel, ticksBetweenChecks, debugLevel);

    }

    // GIVE OUR CREEPS THEIR SET OF DIRECTIONS DEPENDING ON THEIR ROLE
    for(let creep in Game.creeps){
        const creepRef = Game.creeps[creep];
        switch(creepRef.memory.role){
            case 'harvester':
                if (debugLevel > 2) {console.log('harvester running');}
                roleHarvester.run(creepRef, debugLevel);
            break;
        }
    }


}



