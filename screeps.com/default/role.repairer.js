var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
			const targets = creep.room.find(FIND_STRUCTURES, {
				filter: object => object.hits < object.hitsMax
			});

			targets.sort((a,b) => a.hits - b.hits);

			if(targets.length > 0) {
				if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleRepairer;