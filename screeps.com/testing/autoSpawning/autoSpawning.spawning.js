
function autoSpawn(spawnName, ticksBetweenChecks = 5){

    // Check for memory leaks every ~5 ticks
    if(Game.time % ticksBetweenChecks === 0){
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                // console.log('deleted role was ' + name.memory.role);
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }

    // Keep track of which room we are controlling
    // let currentRoomName = Game.spawns[spawnName].room.name;
    let currentRoom = Game.spawns[spawnName].room;

    // If it's a new room, establish a spawnQueue in memory for it
    // which will also be used by the deathChecker
    
    // 

    
    // For each role check how many we actually have and save it to memory (and log it)
    for(let role in Memory.creepInfo[currentRoom.name]){
        let actualNumberAliveNow = _.filter(Game.creeps, (creep) => creep.memory.role == role.roleName);
        role.numberAliveNow = actualNumberAliveNow;
        console.log(role.roleName + 's: ' + role.numberAliveNow + ' / ' + role.numberToMaintain);
    }



    // Check our spawnQueue and start working on it
    if(Memory.creepInfo[currentRoom.name].creepSpawnQueue != []){

        let roomSpawnQueue = Memory.creepInfo[currentRoom.name].creepSpawnQueue;
        let deadCreepRole = roomSpawnQueue[0].role;

        // If the dead creep's role is not in demand remove it from the queue
        if (Memory.creepInfo[currentRoom.name][deadCreepRole + 's'].numberAliveNow 
        > Memory.creepInfo[currentRoom.name][deadCreepRole + 's'].numberToMaintain) 
        {
            // TODO
            // adjust the roleNumber in memory !!!!!!!!!??
            shift(roomSpawnQueue);
        }


        else{

            let newName = role.roleName + replacementRoleNumber;

            let rcLevel = 'rc' + currentRoom.controller.level;
            let bodyPartsArray = Memory.creepInfo[currentRoom.name][deadCreepRole + 's'].bodyParts[rcLevel];
            console.log('controller level is: ' + rcLevel);
            console.log(bodyPartsArray);

            let replacementRoleNumber = roomSpawnQueue[0].roleNumber;
            console.log(replacementRoleNumber);

            if (replacementRoleNumber === 0 || replacementRoleNumber == undefined || replacementRoleNumber == null) {
                let currentRoleNum = Memory.creepInfo[currentRoom.name][deadCreepRole + 's'].currentRoleNumber;
                replacementRoleNumber = currentRoleNum;
                Memory.creepInfo[currentRoom.name][deadCreepRole + 's'].currentRoleNumber = currentRoleNum + 1;
            }

            
            console.log('Working on a new ' + role.roleName + ': ' + newName);

            Game.spawns[spawnName].spawnCreep(bodyPartsArray, newName, {
                memory: {
                    roomCreated: currentRoom.name,
                    role: role.roleName,
                    roleNumber: replacementRoleNumber
                }
            });
        }


    }






    
}


module.exports = autoSpawn;