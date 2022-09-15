const getEnergy = require('task.getEnergy');
const storeEnergy = require('task.storeEnergy');
const build = require('task.build');
const repairRoom = require('task.repairRoom');
const upgradeRoom = require('task.upgradeRoom');




let roleTester = {

    /** @param {Creep} creep **/
    run: function (creep) {

        let freeCapacity = creep.store.getFreeCapacity();
        let currentEnergy = creep.store[RESOURCE_ENERGY];

        // ---------- Decide what to do ------------ 
        // Based on a single if-else: if the first thing is doable it will ignore lower jobs
        
        // Refill energy if it has run out
        if (currentEnergy == 0 && creep.memory.task != 'getEnergy'){
            creep.memory.task = 'getEnergy';
            getEnergy(creep);
        } 
        // If we were just gathering energy keep gathering until full
        else if(freeCapacity > 0 && creep.memory.task == 'getEnergy'){
            getEnergy(creep);
        }
            // ----- AFTER FILLING ENERGY SET TASK UNTIL IT RETURNS FALSE -----

        // Repair anything that needs it
        else if (currentEnergy > 0 && repairRoom(creep)) {
            creep.memory.task = 'repair';
            repairRoom(creep);
        }
        // Store the energy anywhere that can hold it
        else if (currentEnergy > 0 && storeEnergy(creep)) {
            creep.memory.task = 'storeEnergy';
            storeEnergy(creep);
        }
        // Build something if possible
        else if (currentEnergy > 0 && build(creep)) {
            creep.memory.task = 'build';
            build(creep);
        }
        // Fall back to upgrading the room controller if nothing else need doing
        else {
            creep.memory.task = 'upgrade';
            upgradeRoom(creep);
        }
        // console.log('tester\'s task is ' + creep.memory.task)
    }

}


module.exports = roleTester;


