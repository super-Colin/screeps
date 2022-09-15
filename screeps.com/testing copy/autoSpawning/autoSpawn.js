
const autoSpawningRoomInit = require('./autoSpawning.init');
const spawning =require('./autoSpawning.spawning');
const deathChecker = require('./autoSpawning.deathChecker');

module.exports = {

    autoSpawn(spawn, ticksBetweenDeathChecks = 3) {

        if( ! Memory.creepInfo[spawn.room.name]){
            console.log('Autospawn is initiating for room ' + spawn.room.name)
            autoSpawningRoomInit(spawn.room.name);
        }

        deathChecker(ticksBetweenDeathChecks);
        
        spawning(spawn);

    }

}

