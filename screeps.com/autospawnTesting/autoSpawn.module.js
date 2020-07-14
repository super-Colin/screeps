
const autoSpawningInit = require("./autoSpawning.init");
const autoSpawningSpawn = require("./autoSpawning.spawn");


function autoSpawningModule(spawnName, roomName, rcLevel, ticksBetweenDeathChecks = 3, debugLog = 0) {

    if (debugLog > 3) {console.log('!>! starting autoSpawnMODULE function !<!');}

    // CHECK FOR OR MAKE Memory.creepMetaInfo.creepRoles
    autoSpawningInit(debugLog);
    // NOW WE HAVE JSON DATA ABOUT OUR CREEP ROLES


    // QUICK MEMORY CHECK FOR DEAD CREEPS TO AVOID A MEMORY LEAK
    // BUT ALSO ONLY EVERY SO MANY TICKS
    if (Game.time % ticksBetweenDeathChecks == 0) {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
    autoSpawningSpawn(spawnName, roomName, rcLevel, ticksBetweenDeathChecks, debugLog);

    if (debugLog > 3) {console.log('!>! Ending autoSpawnMODULE function !<!');}
}

module.exports = autoSpawningModule;