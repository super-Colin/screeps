

function upgradeRoom(creep){




    // if the creep is empty, stop upgrading
    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
        creep.memory.status = "empty";
        return false;
    } // ... else{


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
            creep.memory.status = "empty";
            return false;
    }

}

module.exports = upgradeRoom;

