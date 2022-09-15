const configs = require("main.config");

function withdrawEnergy(creep, useClosest = true) {
    if( creep.memory.task != "withdrawEnergy" ){
        creep.memory.task = "withdrawEnergy";
        creep.memory.status = "withdrawing";
        creep.say('⚙️ Withdrawing Energy');

        var energyStores = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_STORAGE) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 50;
            }
        });
        if (energyStores.length == 0) {
            // there are no stores to withdraw from
            creep.memory.status = "blocked";
            return false;
        }
        let closestByPath = creep.pos.findClosestByPath(energyStores)

        if(useClosest){
            creep.memory.targetId = closestByPath.id;
        }else{
            // TODO???
            // let otherEnergyStores = creep.room.find(FIND_SOURCES_ACTIVE, {
            //     filter: (structure) => {
            //         return (structure.id != closestByPath.id);
            //     }
            // });

            if (energyStores.length > 0) {
                // pick a random source to use as target... I know it's bad..
                creep.memory.targetId = energyStores[Math.floor(Math.random() * energyStores.length)].id;
            }else{
                creep.memory.status = "blocked";
                return false;
            }
        }

    }



    let targetEnergyStore = Game.getObjectById(creep.memory.targetId);
    let withdrewEnergy = creep.withdraw(targetEnergyStore, RESOURCE_ENERGY);

    switch(withdrewEnergy){
        case ERR_NOT_IN_RANGE:
            creep.moveTo(targetEnergyStore, {visualizePathStyle: {stroke: configs.colors.paths.energy}});
            creep.memory.status = "withdrawing";
            return true;
        case ERR_NOT_ENOUGH_RESOURCES:
            creep.memory.status = "empty";
            return false;
        case ERR_FULL:
            creep.memory.status = "full";
            return false;
        
    }

    return false; // return false so we know we can do something else
}



module.exports = withdrawEnergy;