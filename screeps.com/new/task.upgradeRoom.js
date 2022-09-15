

function upgradeRoom(creep){
    let upgraded = creep.upgradeController(creep.room.controller);

    switch(upgraded){
        case OK:
            creep.memory.status = "upgrading";
            return true;
        case ERR_NOT_IN_RANGE:
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            creep.memory.status = "upgrading";
            return true;
        case ERR_NOT_ENOUGH_RESOURCES:
            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            creep.memory.status = "empty";
            return false;
    }

}

module.exports = upgradeRoom;

