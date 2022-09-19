const configs = require("./main.config");

Creep.prototype.harvestEnergy = function(creep, useClosest = true) {

    const debgLvl = configs.debugLevel.task;
    const taskName = "harvestEnergy";
    const successStatusName = "harvesting"; // for when already doing this task sucessfully to a target

    // Check if the creep is already successfully doing this task
    if( this.memory.task.L_status != successStatusName ){
        this.updateTask(taskName);

        // Find the closest place to mine
        let closestByPath = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)

        // if none return false
        if(closestByPath == null){
            creep.say('🌀 Nowhere to Harvest Energy');
            creep.memory.status = "blocked";
            return false;
        }

        // otherwise set a targetId for a source
        creep.say('⛏️ Harvesting Energy');
        if(useClosest){
            // console.log("setting creep targetId for harvesting")
            creep.memory.targetId = closestByPath.id;
            this.updateTargetId("task", closestByPath.id);
        }else{
            let otherEnergySources = creep.room.find(FIND_SOURCES_ACTIVE, {
                filter: (source) => {
                    // console.log("source is:")
                    // console.log(source)
                    return (source.id != closestByPath.id);
                }
            });
            // console.log("other sources are: ")
            // console.log(otherEnergySources)
            if (otherEnergySources.length > 0) {
                // pick a random source to use as target... I know it's bad..
                this.updateTargetId("task", otherEnergySources[Math.floor(Math.random() * otherEnergySources.length)].id);
            }else{
                // still use closest as fallback in case
                this.updateTargetId("task", closestByPath.id);
            }
        }
    }





    // if the creep is full, stop mining
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        this.updateTaskStatus("full");
        return false;
    } // ... else{



    let creepTarget = Game.getObjectById(creep.memory.targetId);
    // console.log("creepTarget is: ");
    // console.log(creepTarget);
    let workResult = creep.harvest(creepTarget);

    switch(workResult){
        case OK:
            this.updateTaskStatus(successStatusName);
            return true;
        case ERR_NOT_ENOUGH_RESOURCES:
            this.updateTaskStatus("blocked");
            return false;
        case ERR_FULL:
            this.updateTaskStatus("full");
            return false;
        // try to move to it
        case ERR_NOT_IN_RANGE:
            let walkResult = creep.moveTo(creepTarget, {visualizePathStyle: {stroke: configs.colors.paths.energy}});
            if(walkResult == ERR_NO_PATH){
                this.updateTaskStatus("blocked");
                return false;
            }
            this.updateTaskStatus(successStatusName);
            return true;
    }

    debgLvl > 4 ? console.log("Returning default FALSE in task: " + taskName) :'';
    return false;
    
}

// module.exports = harvestEnergy;
