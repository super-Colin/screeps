const getEnergy = require('./task.getEnergy');
const build = require('./task.build');
const repairRoom = require('./task.repairRoom');
const upgradeRoom = require('./task.upgradeRoom');
const cityPlan = require('./task.cityPlan');




let roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep, debugLevel = 0) {

        if (debugLevel > 4) {console.log('role.builder running');}

        let freeCapacity = creep.store.getFreeCapacity();
        let currentEnergy = creep.store[RESOURCE_ENERGY];

        
        // Refill energy if it has run out
        if (currentEnergy == 0 && creep.memory.task != 'getEnergy'){
            // SET CREEP'S TASK SO HE DOESN'T FORGET AS SOON AS HE GETS 1 UNIT OF ENERGY
            creep.memory.task = 'getEnergy';
            getEnergy(creep);
        } 
        // If we were just gathering energy keep gathering until full
        else if(freeCapacity > 0 && creep.memory.task == 'getEnergy'){
            getEnergy(creep);
        }
        // ----- AFTER FILLING ENERGY SET TASK UNTIL IT RETURNS FALSE -----


        // CITY PLANNING UNTIL ROOM LEVEL REQUIREMENTS ARE MET (NEW EXTENSIONS, TOWERS ETC.)
        else if (currentEnergy > 0 && cityPlan(creep)) {
            console.log('city Planning');
            cityPlan(creep, debugLevel);
            // build(creep);
        }

        // Build something if possible
        else if (currentEnergy > 0 && build(creep)) {
            if (debugLevel > 2) {console.log('role.builder building');}
            build(creep);
        }

        // Repair anything that needs it
        else if (currentEnergy > 0 && repairRoom(creep, false)) {
            creep.memory.task = 'repair';
            // REPAIR STRUCTURES BUT NOT WALLS OR ROADS
            repairRoom(creep, false);
        }

        // Fall back to upgrading the room controller if nothing else needs doing
        else {
            creep.memory.task = 'upgrade';
            upgradeRoom(creep);
        }

    }

}


module.exports = roleBuilder;


