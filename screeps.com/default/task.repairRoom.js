
function repairRoom(creep){
    const wallLimit = 20000;
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax && object.hits <= wallLimit
    });

    targets.sort((a, b) => a.hits - b.hits);
    if (targets == {} || targets == [] || targets == undefined || targets[0] == undefined) {
        return false;
    }
    // If creep is new give him an object to remember
    if(creep.memory.taskObjectId == undefined || null){
        creep.memory.taskObjectId = targets[0].id;
        toRepair = Game.getObjectById(creep.memory.taskObjectId);
    }
    // otherwise if taskObject .hits > wallLimit (OR) if it's already at max
     else if (targets != undefined && Game.getObjectById(creep.memory.taskObjectId).hits >= wallLimit || Game.getObjectById(creep.memory.taskObjectId).hits == Game.getObjectById(creep.memory.taskObjectId).hitsMax) {
        //  console.log('targets:   ');
        //  console.log(targets);
        //  console.log(typeof(targets));
        creep.memory.taskObjectId = targets[0].id;
    }
    // console.log(creep.memory.taskObject);
    
    if (targets.length > 0) {

        if (creep.repair(Game.getObjectById(creep.memory.taskObjectId)) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.taskObjectId), {visualizePathStyle: {stroke: '#33aaff'} });
        }
        
        return true;
    } 
    if (targets == {}) {
         return false;
    }

}
module.exports = repairRoom;

