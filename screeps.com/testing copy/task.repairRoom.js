
function repairRoom(creep, repairWalls = true, hitLimit = 100000){

    let targets;
    if(repairWalls === true){
        // if repairWalls is true find ramparts, walls and roads
        targets = creep.room.find(FIND_STRUCTURES, {
            filter: object =>
                   object.structureType == STRUCTURE_RAMPART
                || object.structureType == STRUCTURE_ROAD
                || object.structureType == STRUCTURE_WALL
                && object.hits < object.hitsMax 
                && object.hits < hitLimit
        });
        // console.log('focusing on walls and roads');
    }
    else{
        // if repairWalls is false find everything but walls and roads
        targets = creep.room.find(FIND_STRUCTURES, {
            filter: object =>
                object.structureType != STRUCTURE_WALL && 
                object.structureType != STRUCTURE_ROAD &&
                object.hits < object.hitsMax &&
                object.hits < hitLimit
        });
        console.log('ignoring roads and walls');
    }


    // targets.sort((a, b) => a.hits - b.hits);
    if (targets == {} || targets == [] || targets == undefined || targets[0] == undefined) {
        return false;
    }
    // If creep is new give him an object to remember
    if(creep.memory.taskObjectId == undefined || null){
        creep.memory.taskObjectId = targets[0].id;
        toRepair = Game.getObjectById(creep.memory.taskObjectId);
        creep.say('🔧 ' + toRepair.structureType);
    }
    // otherwise if taskObject .hits > hitLimit (OR) if it's already at max
     else if (targets != undefined 
        && Game.getObjectById(creep.memory.taskObjectId).hits >= hitLimit 
        || Game.getObjectById(creep.memory.taskObjectId).hits == Game.getObjectById(creep.memory.taskObjectId).hitsMax
    ) {
        creep.memory.taskObjectId = targets[0].id;
        toRepair = Game.getObjectById(creep.memory.taskObjectId);
        creep.say('🔧 ' + toRepair.structureType);
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

