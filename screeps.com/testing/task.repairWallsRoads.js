
function repairWallsRoads(creep){
    const wallLimit = 150000;
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => 
           object.structureType == STRUCTURE_RAMPART
        || object.structureType == STRUCTURE_ROAD
        || object.structureType == STRUCTURE_WALL
        && object.hits < object.hitsMax 
        && object.hits <= wallLimit
    });

    targets.sort((a, b) => a.hits - b.hits);
    if (targets == {} || targets == [] || targets == undefined || targets[0] == undefined) {
        return false;
    }
    // If creep is new give it a taskObject to remember
    // You can only save the id an object in memory so it must be refered to from here on
    if (creep.memory.taskObjectId == undefined || creep.memory.taskObjectId == null) {
        creep.memory.taskObjectId = targets[0].id;
        toRepair = Game.getObjectById(creep.memory.taskObjectId);
    }
    // otherwise if taskObject is already at max or at wall limit give it a new taskObject
     else if (targets != undefined && Game.getObjectById(creep.memory.taskObjectId).hits >= wallLimit) {
        creep.memory.taskObjectId = targets[0].id;
    }
    
    if (targets.length > 0) {
        if (creep.repair(Game.getObjectById(creep.memory.taskObjectId)) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.getObjectById(creep.memory.taskObjectId), {visualizePathStyle: {stroke: '#33aaff'} });
        }
        return true;
    } 
    if (targets == {}) {
        console.log('repairWallRoads returning false');
         return false;
    }

}
module.exports = repairWallsRoads;

