
const autoSpawningRoomInit = require('./autoSpawning.init');
const autoSpawning = require('./autoSpawning.spawning');
// const respawning = require('./autoSpawning.respawning');
const deathChecker = require('./autoSpawning.deathChecker');



    function autoSpawn(spawnName, roomName, ticksBetweenDeathChecks = 3) {
        // console.log(Memory.creepInfo);


        if(Memory.creepInfo == undefined || Memory.creepInfo[roomName] == undefined){

            console.log('Autospawn is initiating for room ' + roomName);
            autoSpawningRoomInit(roomName);

        }

                // console.log('roomCreepSpawnQueue :  [from mainJS]');
                // console.log(roomName);
                // console.log(Memory.creepInfo[roomName].roomCreepSpawnQueue);


        deathChecker(ticksBetweenDeathChecks);

        autoSpawning(spawnName, roomName);
        //   spawning(spawnName, roomName);
        // respawning(spawnName, roomName);

    }


module.exports = autoSpawn;
