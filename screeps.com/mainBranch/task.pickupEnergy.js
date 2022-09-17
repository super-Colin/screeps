const configs = require("./main.config");

function pickupEnergy(creep, useClosest = true) {
    // Check if the creep is just starting on this task
    if( creep.memory.status != "picking" || creep.memory.targetId == undefined){
        creep.memory.task = "pickupEnergy";

        // Find the closest place to mine
        let closestByPath = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)

        // if none return false
        if(closestByPath == null){
            creep.say('🌀 Nowhere to Pick up Energy');
            creep.memory.status = "none";
            return false;
        }

        if(closestByPath.resourceType != "energy" || closestByPath.amount < configs.minimumEnergyToPickup ){
            creep.memory.status = "none";
            return false;
        }

        // otherwise set a targetId for a source
        creep.say('🌀 Picking up Energy');
        creep.memory.targetId = closestByPath.id;

    }


    let creepTarget = Game.getObjectById(creep.memory.targetId);
    let workResult = creep.pickup(creepTarget);

    switch(workResult){
        case OK:
            creep.memory.status = "picking";
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
            creep.memory.status = "picking";
            return true;
    }

    console.log("Returning default FALSE in task: pickupEnergy");
    return false;
}


module.exports = pickupEnergy;
