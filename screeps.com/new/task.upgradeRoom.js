

function upgradeRoom(creep){

    if( creep.memory.status != "upgrading" || creep.memory.targetId == undefined ){
        creep.memory.task = "upgradeRoom"
        creep.memory.status = "upgrading"
        creep.say('⚡️ Upgrading Room');
    }






    let upgraded = creep.upgradeController(creep.room.controller);
    switch(upgraded){
        case OK:
            creep.memory.status = "upgrading";
            return true;
        case ERR_NOT_IN_RANGE:
            let walkResult = creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            if(walkResult == ERR_NO_PATH){
                creep.memory.status = "blocked";
                return false;
            }
            creep.memory.status = "upgrading";
            return true;
        case ERR_NOT_ENOUGH_RESOURCES:
            creep.memory.status = "empty";
            return false;
    }

}

module.exports = upgradeRoom;

