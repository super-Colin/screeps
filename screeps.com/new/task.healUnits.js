const configs = require("main.config");


function findTarget(creep){
    // let hurtUnits = creep.room.find(FIND_MY_CREEPS,{filter:function(unit){return unit.hits < unit.maxHits}});
    // let newTarget = creep.pos.findClosestByPath(hurtUnits)
    // let newTarget = creep.pos.findClosestByRange(FIND_MY_CREEPS,{filter:function(unit){return unit.hits < unit.maxHits}})
    let newTarget = creep.pos.findClosestByPath(FIND_MY_CREEPS, {filter: function(unit) {return unit.hits < unit.hitsMax;}});
    console.log("[heal] healUnits newTarget: ");
    console.log(JSON.stringify(newTarget));
    newTarget = newTarget ? newTarget.id : 0;
    return newTarget;
}



function healUnits(creep, hivemind) {
    // if not already healing something
    if( creep.memory.task != "heal" || creep.memory.targetId == undefined ){
        creep.memory.task = "heal"
        creep.say('🎵 Healing Units');

        //Pick a target 
        creep.memory.targetId = findTarget(creep);

    }else if(creep.memory.targetId == 0 || creep.memory.status == "none"){
        // if there is no target check again every configured amount of ticks
        if(Game.time % configs.ticksBetweenRoomHealCheck == 0){
            let newTarget = findTarget(creep);
            if(newTarget == 0){
                creep.memory.status = "none";
                return false;
            }else{
                creep.memory.targetId = newTarget;
            }
        }else{
            // don't stand around if no target
            return false;
        }
        
    }

    let creepTarget = Game.getObjectById(creep.memory.targetId);
    // If the target was fully healed or killed remove it as the target
    if(  creepTarget == null || creepTarget == undefined || creepTarget.hits == creepTarget.hitsMax){
        creep.memory.targetId = 0;
        creep.memory.status = "none";
        return false;
    }
    // console.log("[heal] creepTarget is: ");
    // console.log(JSON.stringify(creepTarget));
    let workResult = creep.heal(creepTarget);
    // console.log("[heal] workResult is: ");
    // console.log(workResult);

    switch(workResult){
        case OK:
            creep.memory.status = "healing";
            hivemind[creep.memory.role][creep.id].status = " "+creep.memory.status+": "+ creepTarget.name;

            return true;
        case ERR_NO_BODYPART:
            // then this creep is wounded and should return to home base
            creep.memory.targetId = creep.memory.homeSpawnId;
            creep.memory.status = "retreating";
            creep.moveTo(Game.getObjectById(creep.memory.homeSpawnId));
        case ERR_NOT_IN_RANGE:
            // then try to move to it
            let walkResult = creep.moveTo(creepTarget, {visualizePathStyle: {stroke: configs.colors.paths.energy}});
            if(walkResult == ERR_NO_PATH){
                creep.memory.status = "blocked";
                return false;
            }
            creep.memory.status = "healing";
            return true;

        default:
            creep.moveTo(creepTarget, {visualizePathStyle: {stroke: configs.colors.paths.energy}});
            console.log("Returning default FALSE in task: healUnits");
            return false;
    }

}


module.exports = healUnits;