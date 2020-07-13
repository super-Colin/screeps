const getEnergy = require('./task.getEnergy');
const storeEnergy = require('./task.storeEnergy');
const build = require('./task.build');
const upgradeRoom = require('./task.upgradeRoom');


let roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep, debugLevel) {
        if (debugLevel > 2) {console.log('role.harvester running');}

        let freeCapacity = creep.store.getFreeCapacity();
        let currentEnergy = creep.store[RESOURCE_ENERGY];

        // ---------- Decide what to do ------------ 
        // Based on a single if-else: if the first thing is doable it will ignore lower jobs
        
        // Refill energy if it has run out
        if (currentEnergy == 0 && creep.memory.task != 'getEnergy'){
            getEnergy(creep);
        } 
        // If we were just gathering energy keep gathering until full
        else if(freeCapacity > 0 && creep.memory.task == 'getEnergy'){
            getEnergy(creep);
        }
        // ----- AFTER FILLING ENERGY SET TASK UNTIL IT RETURNS FALSE -----

        
        // Store the energy anywhere that can hold it
        else if (currentEnergy > 0 && storeEnergy(creep)) {
            storeEnergy(creep);
        }

        // Build something if possible
        else if (currentEnergy > 0 && build(creep)) {
            
            build(creep);
        }

        // Fall back to upgrading the room controller if nothing else need doing
        else {
            creep.memory.task = 'upgrade';
            upgradeRoom(creep);
        }
    }

}


module.exports = roleHarvester;


