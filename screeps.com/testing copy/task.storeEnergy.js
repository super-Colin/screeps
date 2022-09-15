
function storeEnergy(creep){
    let energyStorage = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    // structure.structureType == STRUCTURE_TOWER ||
                    // structure.structureType == STRUCTURE_CONTAINER ) &&
                    structure.structureType == STRUCTURE_TOWER ) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });

     if (energyStorage == []) {
         return false;
     }

    if (creep.transfer(energyStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(energyStorage[0], {visualizePathStyle: {stroke: '#ffff00'} } );
                return true;

    }


}


module.exports = storeEnergy;
