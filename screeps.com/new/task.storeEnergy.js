const configs = require("main.config");

function storeEnergy(creep) {
    if( creep.memory.task != "storeEnergy" ){
        creep.memory.task = "storeEnergy"
        creep.memory.status = "storing"
        creep.say('💲 Storing Energy');
    }

    var energyStores = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if (energyStores.length > 0) {
        if (creep.transfer(energyStores[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(energyStores[0], {
                visualizePathStyle: {
                    stroke: configs.colors.paths.energy
                }
            });
            return true;
        }
    } else {
        console.log('There is nowhere to store more energy in this room');
        return false; // return false so we know we can do something else
    }
}






module.exports = storeEnergy;