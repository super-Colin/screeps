const upgradeRoom = require('task.upgradeRoom');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
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
            // if (creep.room.name != 'W23N35') {
            //     creep.moveTo(42, 22, 'W23N35');
            //     console.log('lost sheep returning :) to : ' + Game.spawns['Spawn1'].room.name);
            // }
            else if (creep.store.getFreeCapacity() == 0 && targets.length == 0){
                console.log('harvestors are bored and upgrading');
                upgradeRoom(creep);
            }

        }
        
	}
};

module.exports = roleHarvester;