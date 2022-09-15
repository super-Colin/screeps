
function autoRespawning(spawnName, currentRoomName, ticksBetweenChecks = 5){

    
    
    // Check our spawnQueue and start working on it
    if(
       Memory.creepInfo[currentRoomName].roomCreepSpawnQueue != undefined
    && Memory.creepInfo[currentRoomName].roomCreepSpawnQueue != {}
    ){

        

        let firstKeyValue = Object.keys(Memory.creepInfo[currentRoomName].roomCreepSpawnQueue)[0];
        console.log('key value : ' + firstKeyValue);

        let deadCreepRole = Memory.creepInfo[currentRoomName].roomCreepSpawnQueue[firstKeyValue].role;


        console.log('roleGroup :  [from autoSpawnJS]');
        console.log(Memory.creepInfo[currentRoomName]);
        console.log(Memory.creepInfo[currentRoomName][deadCreepRole + 's']);

        // If the dead creep's role is not in demand remove it from the queue
        if (Memory.creepInfo[currentRoomName][deadCreepRole + 's'].numberAliveNow 
        > Memory.creepInfo[currentRoomName][deadCreepRole + 's'].numberToMaintain) 
        {
            // TODO
            // adjust the roleNumber in memory !!!!!!!!!??
            // shift(roomSpawnQueue);
            shift(Memory.creepInfo[currentRoomName].roomCreepSpawnQueue);
        }
        else{

            let rcLevel = 'rc' + Game.rooms[currentRoomName].controller.level;
            let bodyPartsArray = Memory.creepInfo[currentRoomName][deadCreepRole + 's'].bodyParts[rcLevel];
            console.log('controller level is: ' + rcLevel);
            console.log(bodyPartsArray);

            let firstKeyValue = Object.keys(Memory.creepInfo[currentRoomName].roomCreepSpawnQueue)[0];
            let replacementRoleNumber = Memory.creepInfo[currentRoomName].roomCreepSpawnQueue[firstKeyValue].roleNumber;
            console.log(replacementRoleNumber);

            let newName = deadCreepRole + replacementRoleNumber;

            if (
                   replacementRoleNumber === 0 
                || replacementRoleNumber == undefined 
                || replacementRoleNumber == null
            ) {
                let currentRoleNum = Memory.creepInfo[currentRoomName][deadCreepRole + 's'].currentRoleNumber;
                replacementRoleNumber = currentRoleNum;
                Memory.creepInfo[currentRoomName][deadCreepRole + 's'].currentRoleNumber = currentRoleNum + 1;
            }

            
            console.log('Working on a new ' + deadCreepRole + ': ' + newName);

            Game.spawns[spawnName].spawnCreep(bodyPartsArray, newName, {
                memory: {
                    roomCreated: currentRoomName,
                    role: deadCreepRole,
                    roleNumber: replacementRoleNumber
                }
            });
        }


    }






    
}


module.exports = autoRespawning;