const configs = require("./main.config");

function harvestEnergy(creep, useClosest = true) {
    // Check if the creep is just starting on this task
    if( creep.memory.status != "harvesting" || creep.memory.targetId == undefined){
        creep.memory.task = "harvestEnergy";
        creep.memory.status = "harvesting";

        // Find the closest place to mine
        let closestByPath = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
        console.log(closestByPath)
        console.log(closestByPath.id)

        // if none return false
        if(closestByPath == null){
            creep.say('🌀 Nowhere to Harvest Energy');
            creep.memory.status = "blocked";
            return false;
        }
        // otherwise set a targetId for a source
        creep.say('🌀 Harvesting Energy');
        if(useClosest){
            console.log("setting creep targetId for harvesting")
            creep.memory.targetId = closestByPath.id;
        }else{
            let otherEnergySources = creep.room.find(FIND_SOURCES_ACTIVE, {
                filter: (source) => {
                    console.log("source is:")
                    console.log(source)
                    return (source.id != closestByPath.id);
                }
            });
            console.log("other sources are: ")
            console.log(otherEnergySources)


            if (otherEnergySources.length > 0) {
                // pick a random source to use as target... I know it's bad..
                console.log("setting creep targetId for harvesting")
                creep.memory.targetId = otherEnergySources[Math.floor(Math.random() * otherEnergySources.length)].id;
            }else{
                creep.memory.targetId = closestByPath.id;
                return false;
            }
        }
    }





    // if the creep is full, stop mining
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.status = "full";
        return false;
    } // ... else{



    let creepTarget = Game.getObjectById(creep.memory.targetId);
    console.log("creepTarget is: ");
    console.log(creepTarget);
    let workResult = creep.harvest(creepTarget);

    switch(workResult){
        case OK:
            creep.memory.status = "harvesting";
            return true;
        case ERR_NOT_ENOUGH_RESOURCES:
            creep.memory.status = "blocked";
            return false;
        case ERR_FULL:
            creep.memory.status = "full";
            return false;
        // try to move to it
        case ERR_NOT_IN_RANGE:
            let walkResult = creep.moveTo(creepTarget, {visualizePathStyle: {stroke: configs.colors.paths.energy}});
            if(walkResult == ERR_NO_PATH){
                creep.memory.status = "blocked";
                return false;
            }
            creep.memory.status = "harvesting";
            return true;
    }




    return true;
    
}






module.exports = harvestEnergy;
