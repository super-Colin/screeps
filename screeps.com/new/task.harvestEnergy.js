const configs = require("./main.config");

function harvestEnergy(creep, useClosest = true) {
    if( creep.memory.task != "harvestEnergy" ){
        creep.memory.task = "harvestEnergy";
        creep.memory.status = "harvesting";
        creep.say('💲 Harvesting Energy');

        let closestByPath = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)

        if(useClosest){
            creep.memory.targetId = closestByPath.id;
        }else{
            let otherEnergySources = creep.room.find(FIND_SOURCES_ACTIVE, {
                filter: (structure) => {
                    return (structure.id != closestByPath.id);
                }
            });

            if (otherEnergySources.length > 0) {
                // pick a random source to use as target... I know it's bad..
                creep.memory.targetId = otherEnergySources[Math.floor(Math.random() * otherEnergySources.length)].id;
            }else{
                creep.memory.status = "blocked";
                return false;
            }
        }
    }





    // if the creep is full, stop mining
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.status = "full";
        return false;
    } // ... else{
    creep.memory.status = "harvesting";
    var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: configs.colors.paths.energy }});
    }



    let creepTarget = Game.getObjectById(creep.memory.targetId);
    let workResult = creep.harvest(creepTarget);

    switch(workResult){
        case OK:
            creep.memory.status = "harvesting";
            return true;
        case ERR_NOT_IN_RANGE:
            creep.moveTo(creepTarget, {visualizePathStyle: {stroke: configs.colors.paths.energy}});
            creep.memory.status = "harvesting";
            return true;
        case ERR_NOT_ENOUGH_RESOURCES:
            creep.memory.status = "blocked";
            return false;
        case ERR_FULL:
            creep.memory.status = "full";
            return false;
        
    }




    return true;
    
}






module.exports = harvestEnergy;
