


function autoSpawningRoomInit(currentRoomName){

    // If 
    if(Memory.creepInfo == undefined){
        Memory.creepInfo = {};
    }

    // If it's a new room, establish it in memory
    // if(Memory.creepInfo[currentRoomName] == undefined){
        Memory.creepInfo[currentRoomName] = {};
        // Memory.creepInfo[currentRoomName].roomCreepSpawnQueue = {toDelete: 'value'};
        // Memory.creepInfo[currentRoomName].roomCreepSpawnQueue = {};
        // console.log('roomCreepSpawnQueue :  [from initJS]');
        // console.log(Memory.creepInfo[currentRoomName].roomCreepSpawnQueue);

        // let firstKeyValue = Object.keys(Memory.creepInfo[currentRoomName].roomCreepSpawnQueue)[0];
        // console.log(Memory.creepInfo[currentRoomName].roomCreepSpawnQueue[firstKeyValue]);
    // }


    // Our roles and how many to keep around of each
    Memory.creepInfo[currentRoomName] = {
        harvesters: {
            roleName: 'harvester',
            numberToMaintain: 3,
            numberAliveNow: 0,
            currentRoleNumber: 1,
            bodyParts: {
                rc1: [WORK, CARRY, MOVE, MOVE],
                rc2: [WORK, CARRY, CARRY, CARRY, MOVE],
                rc3: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
            }
        },
        upgraders: {
            roleName: 'upgrader',
            numberToMaintain: 4,
            numberAliveNow: 0,
            currentRoleNumber: 1,
            bodyParts: {
                rc1: [WORK, CARRY, MOVE, MOVE],
                rc2: [WORK, CARRY, CARRY, MOVE, MOVE],
                rc3: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
            }
        },
        builders: {
            roleName: 'builder',
            numberToMaintain: 3,
            numberAliveNow: 0,
            currentRoleNumber: 1,
            bodyParts: {
                rc1: [WORK, CARRY, MOVE, MOVE],
                rc2: [WORK, CARRY, CARRY, MOVE, MOVE],
                rc3: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
            }
        },
        testers: {
            roleName: 'tester',
            numberToMaintain: 4,
            numberAliveNow: 0,
            currentRoleNumber: 1,
            bodyParts: {
                rc1: [WORK, CARRY, MOVE, MOVE],
                rc2: [WORK, CARRY, CARRY, MOVE, MOVE],
                rc3: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
            }
        }
    };

    // If it's a new room, establish a spawnQueue in memory for it
    if (Memory.creepInfo[currentRoomName].roomCreepSpawnQueue == undefined) {
        // Memory.creepInfo[currentRoomName].roomCreepSpawnQueue = {};
        Memory.creepInfo[currentRoomName].roomCreepSpawnQueue = {
            toDelete: {
                roomCreated: currentRoomName,
                role: 'harvester',
                roleNumber: 0,
                toDelete: true
            }
        };
        console.log('defined spawn queue in room : ' + currentRoomName);
    }
    // console.log('roomCreepSpawnQueue :  [from initJS]');
    // console.log(currentRoomName);
    // console.log(Memory.creepInfo[currentRoomName].roomCreepSpawnQueue);
    


    
    for (let roleGroup in Memory.creepInfo[currentRoomName]) {
        
        if (
               Memory.creepInfo[currentRoomName][roleGroup].numberAliveNow == undefined
            && Memory.creepInfo[currentRoomName][roleGroup] != 'roomCreepSpawnQueue'
        ) {
            // console.log('role not defined');
            // console.log(roleGroup);
            Memory.creepInfo[currentRoomName][roleGroup].numberAliveNow = 0;
            Memory.creepInfo[currentRoomName][roleGroup].currentRoleNumber = 1;
            Memory.creepInfo.roles.push(roleGroup);
            // console.log(roleGroup['currentRolenumber']);
        }
        else{
            console.log('role group : ' + roleGroup + ', roleNumber : ' + Memory.creepInfo[currentRoomName][roleGroup].currentRoleNumber +' is already defined');
        }

    }


}




module.exports = autoSpawningRoomInit;