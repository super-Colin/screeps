const configs = require("../main.config");
const roleRoadWorker = require("../role.roadWorker");



function autoSpawningRoomInit(currentRoomName){

    // If it's a new room, establish a spawnQueue in memory for it
    // which will also be used by the deathChecker
    if ( ! Memory.creepInfo[currentRoomName].creepSpawnQueue ) {
        Memory.creepInfo[currentRoomName].creepSpawnQueue = [];
    }


    // Our roles and how many to keep around of each
    Memory.creepInfo[currentRoomName] = {
        harvesters: {
            roleName: 'harvester',
            numberToMaintain: 3,
            numberAliveNow,
            // currentRolenumber,
            bodyParts: {
                rc1: [WORK, CARRY, MOVE, MOVE],
                rc2: [WORK, CARRY, CARRY, CARRY, MOVE],
                rc3: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
            }
        },
        upgraders: {
            roleName: 'upgrader',
            numberToMaintain: 4,
            numberAliveNow,
            // currentRolenumber,
            bodyParts: {
                rc1: [WORK, CARRY, MOVE, MOVE],
                rc2: [WORK, CARRY, CARRY, MOVE, MOVE],
                rc3: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
            }
        },
        builders: {
            roleName: 'builder',
            numberToMaintain: 3,
            numberAliveNow,
            // currentRolenumber,
            bodyParts: {
                rc1: [WORK, CARRY, MOVE, MOVE],
                rc2: [WORK, CARRY, CARRY, MOVE, MOVE],
                rc3: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
            }
        },
        testers: {
            roleName: 'tester',
            numberToMaintain: 4,
            numberAliveNow,
            // currentRolenumber,
            bodyParts: {
                rc1: [WORK, CARRY, MOVE, MOVE],
                rc2: [WORK, CARRY, CARRY, MOVE, MOVE],
                rc3: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
            }
        }
    };

    for (let roleGroup of Memory.creepInfo[currentRoomName]){
        if(! roleGroup.currentRolenumber){
            roleGroup.currentRolenumber = 1;
        }
    }


}




module.exports = autoSpawningRoomInit;