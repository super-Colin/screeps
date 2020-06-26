
function repairRoom(creep){
    const wallLimit = 501000;
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax && object.hits < wallLimit
    });

    let toRepair;
    if (creep.memory.taskObjectId){
        toRepair = Game.getObjectById(creep.memory.taskObjectId);
    }

    targets.sort((a, b) => a.hits - b.hits);
    if(creep.memory.taskObjectId == undefined || null){
        creep.memory.taskObjectId = targets[0].id;
        toRepair = Game.getObjectById(creep.memory.taskObjectId);
    } else if (toRepair.hits > wallLimit) {
        creep.memory.taskObjectId = targets[0].id;
    }
    // console.log(creep.memory.taskObject);
    if (targets.length > 0) {

        if (creep.repair(toRepair) == ERR_NOT_IN_RANGE) {
            creep.moveTo(toRepair, {visualizePathStyle: {stroke: '#33aaff'} });
        }
        
        return true;
    } 
    else{
         return false;
    }

}
module.exports = repairRoom;

