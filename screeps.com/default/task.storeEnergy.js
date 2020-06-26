
function storeEnergy(creep){
    let energyStorage = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });

    
    // console.log('energyStorage = ' + energyStorage);


    if(energyStorage == []){
        return false;
    }
    if (creep.transfer(creep.pos.findClosestByRange(energyStorage), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(energyStorage, {visualizePathStyle: {stroke: '#ffaa00'} } );
    }

}


module.exports = storeEnergy;
