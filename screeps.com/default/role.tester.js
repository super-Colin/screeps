const getEnergy = require('task.getEnergy');
const storeEnergy = require('task.storeEnergy');
const build = require('task.build');
const repairRoom = require('task.repairRoom');



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
        } else if(freeCapacity > 0 && creep.memory.task == 'getEnergy'){
            // console.log('tester still gathering energy');
            // creep.memory.task = 'getEnergy';
        }

        // Repair anything that needs it
        else if (currentEnergy > 0 && repairRoom(creep)) {
            creep.memory.task = 'repair';
        }
        // store the energy anywhere that can hold it
        else if (currentEnergy > 0 && storeEnergy(creep)) {
            creep.memory.task = 'storeEnergy';
        }
        // build something if possible
        else if (currentEnergy > 0 && build(creep)) {
            creep.memory.task = 'build';
        }



        // If the unit has energy check if there is something that needs to be built



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

            default: console.log('tester default switch case !!??!!?!?!?!??');
        }


        console.log('tester\'s task is ' + creep.memory.task)
    }

}





module.exports = roleTester;


