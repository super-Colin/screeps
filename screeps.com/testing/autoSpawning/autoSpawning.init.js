const configs = require("../main.config");
const roleRoadWorker = require("../role.roadWorker");



function autoSpawningRoomInit(currentRoomName){

    // If it's a new room, establish a spawnQueue in memory for it
    // which will also be used by the deathChecker
    if ( ! Memory.creepInfo[currentRoomName].creepSpawnQueue ) {
        Memory.creepInfo[currentRoomName].creepSpawnQueue = [];
    }



}




module.exports = autoSpawningRoomInit;