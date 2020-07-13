
function build(creep){
    creep.memory.task = 'build';
    
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if(targets.length) {
        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
        return true;
    } else {
        return false
    }

}


module.exports = build;
