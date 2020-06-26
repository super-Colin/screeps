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
        
        // Refill energy if it has run out
        if (currentEnergy == 0 && creep.memory.task != 'getEnergy'){
            console.log('tester needs to get energy');
            creep.memory.task = 'getEnergy';
        } 
        // If we were just gathering energy keep gathering until full
        else if(freeCapacity > 0 && creep.memory.task == 'getEnergy'){
            // Just breaking out of our if cascade
        }

        // ----- AFTER FILLING ENERGY SET TASK UNTIL IT RETURNS FALSE -----

        // Repair anything that needs it
        else if (currentEnergy > 0 && repairRoom(creep)) {
            creep.memory.task = 'repair';
        }
        // Store the energy anywhere that can hold it
        else if (currentEnergy > 0 && storeEnergy(creep)) {
            creep.memory.task = 'storeEnergy';
        }
        // Build something if possible
        else if (currentEnergy > 0 && build(creep)) {
            creep.memory.task = 'build';
        }

        // Fall back to upgrading the room controller if nothing else need doing
        else {
            creep.memory.task = 'upgrade';
        }


        switch(creep.memory.task){
            case 'getEnergy':
                getEnergy(creep);
                // console.log('tester is getting energy');
            break

            case 'repair':
                repairRoom(creep);
                // console.log('tester is repairing');
            break

            case 'build':
                build(creep);
                // console.log('tester is building');
            break

            case 'storeEnergy':
                storeEnergy(creep);
                // console.log('tester is storing energy');
            break

            case 'upgrade': 
                upgradeRoom(creep);
            break
            
            default: console.log('tester default switch case !!??!!?!?!?!??');
        }


        console.log('tester\'s task is ' + creep.memory.task)
    }

}


module.exports = roleTester;


