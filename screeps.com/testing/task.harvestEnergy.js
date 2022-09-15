
function harvestEnergy(creep) {
    if( creep.memory.task != "harvestEnergy" ){
        creep.memory.task = "harvestEnergy"
        creep.say('💲 Harvesting Energy');
    }

        // if the creep is full, stop mining
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.status = "full";
            return false;
        }
        if(creep.store.getFreeCapacity(RESOURCE_ENERGY)){
            creep.memory.status = "harvesting";
            var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {
                    visualizePathStyle: {
                        stroke: configs.colors.paths.energy
                    }
                });
            }
        }
    }





    
module.exports = harvestEnergy;
