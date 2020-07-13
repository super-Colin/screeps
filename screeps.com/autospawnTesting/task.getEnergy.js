
function getEnergy(creep, findClosest = true){
    creep.memory.task = 'getEnergy';

    let energySource;
    if(findClosest){
        energySource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    } else {
        console.log('this may not work so double check, task.getEnergy')
        energySource = creep.pos.find(FIND_SOURCES_ACTIVE)[0];
    }

    if (creep.harvest(energySource) == ERR_NOT_IN_RANGE) {
        creep.moveTo(energySource, {visualizePathStyle: {stroke: '#ffaa00'} } );
        return true;
    }
    // else{
    //     return false;
    // }
}


module.exports = getEnergy;
