
// const respawning = require('./autoSpawning.respawning');

const roomAutoSpawning = require("./autoSpawning.spawn");
const autoSpawningInit = require("./autoSpawning.init");



function autoSpawningModule(spawnName, roomName, rcLevel, ticksBetweenDeathChecks = 3, debugLog = 0) {
    if (debugLog == true) {
        console.log('-');
        console.log('!>! starting autoSpawnMODULE function !<!');
        console.log('-');
    }


    autoSpawningInit(debugLog);

    roomAutoSpawning(spawnName, roomName, rcLevel, ticksBetweenDeathChecks, debugLog);



    if (debugLog == true) {
        console.log('-');
        console.log('!>! Ending autoSpawnMODULE function !<!');
        console.log('-');
    }
}


module.exports = autoSpawningModule;
