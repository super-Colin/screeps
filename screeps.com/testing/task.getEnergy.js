
function getEnergy(creep){
    var energySource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    if (creep.harvest(energySource) == ERR_NOT_IN_RANGE) {
        creep.moveTo(energySource, {visualizePathStyle: {stroke: '#ffaa00'} } );
        return true;
    }
    // else{
    //     return false;
    // }
}


module.exports = getEnergy;
