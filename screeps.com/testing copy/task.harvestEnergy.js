
function harvestEnergy(creep) {
        // if the creep is full, stop mining
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.status = "full";
            // creep.say('💲 banking');
            return false;
        }
        if(creep.store.getFreeCapacity(RESOURCE_ENERGY)){
            var sources = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
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
