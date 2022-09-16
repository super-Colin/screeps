const configs = require("main.config");

function defendRoom(creep) {
    if( creep.memory.status != "defending" || creep.memory.targetId == undefined ){
        creep.memory.task = "defendRoom"
        creep.say('⚔️ Defending Room');

        //Pick a target 
        let newTarget = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
        newTarget = newTarget ? newTarget : creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
        newTarget = newTarget ? newTarget : creep.pos.findClosestByPath(FIND_HOSTILE_CONSTRUCTION_SITES);
        newTarget = newTarget ? newTarget.id : 0;
        creep.memory.targetId = newTarget;

    }else if(creep.memory.targetId == 0 || creep.memory.status == "none"){
        // if there is no target check again every configured amount of ticks
        if(Game.time % configs.ticksBetweenRoomDefenseCheck == 0){
        let newTarget = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
            newTarget = newTarget ? newTarget : creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES);
            newTarget = newTarget ? newTarget : creep.pos.findClosestByPath(FIND_HOSTILE_CONSTRUCTION_SITES);
            newTarget = newTarget ? newTarget.id : 0;
            creep.memory.targetId = newTarget;
        }else{
            // return false;
            return true;
        }
        
    }

    let creepTarget = Game.getObjectById(creep.memory.targetId);
    console.log("[attack] creepTarget is: ");
    console.log(creepTarget);
    let workResult = creep.attack(creepTarget);
    console.log("[attack] workResult is: ");
    console.log(workResult);

    switch(workResult){
        case OK:
            creep.memory.status = "defending";
            return true;
        // try to move to it
        case ERR_NOT_IN_RANGE:
            let walkResult = creep.moveTo(creepTarget, {visualizePathStyle: {stroke: configs.colors.paths.energy}});
            if(walkResult == ERR_NO_PATH){
                creep.memory.status = "blocked";
                return false;
            }
            creep.memory.status = "defending";
            return true;
        default:
            creep.moveTo(creepTarget, {visualizePathStyle: {stroke: configs.colors.paths.energy}});
    }

    console.log("Returning default FALSE in task: defendRoom");
    return false;
}


module.exports = defendRoom;