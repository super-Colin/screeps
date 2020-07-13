
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, debugLog = 0) {
	    if(creep.store.getFreeCapacity() > 0) {
            var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if (creep.store.getFreeCapacity() == 0 && targets.length == 0){

                if(debugLog > 2){console.log('harvester: ' + creep + ' is bored');}
            }

        }
        
	}
};

module.exports = roleHarvester;