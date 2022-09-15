
function autoSpawning(spawnName, currentRoomName, ticksBetweenChecks = 5){

    // Keep track of which room we are controlling

    // let currentRoomNameName = Game.spawns[spawnName].room.name;
    // let currentRoomName = Game.spawns[spawnName].room.name;
    // console.log('current room is : ' + currentRoomName);
    // If it's a new room, establish a spawnQueue in memory for it
    // which will also be used by the deathChecker

    
    // For each role check how many we actually have and save it to memory (and log it)
    for(let role in Memory.creepInfo[currentRoomName]){
        if(role == 'roomCreepSpawnQueue'){
            console.log('THIS SHOULD ONLY TRIGGER ONCE');
            break;
        }else{
            console.log('role else was yes for : ' + role);
            let actualNumberAliveNow = _.filter(Game.creeps, (creep) => creep.memory.role == role.roleName);
            Memory.creepInfo[currentRoomName][role].numberAliveNow = actualNumberAliveNow;
            // console.log(role.roleName + 's: ' + role.numberAliveNow + ' / ' + role.numberToMaintain);
        }

    }
    
    // Check our spawnQueue and organize it...
    console.log('Spawn Queue');
    console.log(JSON.stringify(Memory.creepInfo[currentRoomName].roomCreepSpawnQueue ));
    if(
       Memory.creepInfo[currentRoomName].roomCreepSpawnQueue != undefined
    && Memory.creepInfo[currentRoomName].roomCreepSpawnQueue != {}
    && Memory.creepInfo[currentRoomName].roomCreepSpawnQueue != []
    && Object.keys(Memory.creepInfo[currentRoomName].roomCreepSpawnQueue)[0] != undefined
    ){

        console.log('LOOKING AT ROOM SPAWN QUEUE');

        let firstKeyValue = Object.keys(Memory.creepInfo[currentRoomName].roomCreepSpawnQueue)[0];
        console.log('key value : ' + firstKeyValue);

        let deadCreepRole = Memory.creepInfo[currentRoomName].roomCreepSpawnQueue[firstKeyValue].role;
        if(deadCreepRole == undefined){
            console.log('spawn queue had no role, removing queue with key: ' + firstKeyValue);
            delete Memory.creepInfo[currentRoomName].roomCreepSpawnQueue[firstKeyValue];
        }


        // If the dead creep's role is not in demand remove it from the queue
        console.log('number alive : ' + (deadCreepRole + 's'));
        console.log(Memory.creepInfo[currentRoomName]);
        console.log(Memory.creepInfo[currentRoomName][deadCreepRole + 's']);
        console.log(Memory.creepInfo[currentRoomName][deadCreepRole + 's'].numberAliveNow);
        if (
            Memory.creepInfo[currentRoomName][deadCreepRole + 's'].numberAliveNow 
            > Memory.creepInfo[currentRoomName][deadCreepRole + 's'].numberToMaintain
            || Memory.creepInfo[currentRoomName].roomCreepSpawnQueue[firstKeyValue].role == undefined
            || Memory.creepInfo[currentRoomName].roomCreepSpawnQueue[firstKeyValue].toDelete == true
        ){
            firstKeyValue = Object.keys(Memory.creepInfo[currentRoomName].roomCreepSpawnQueue)[0];
            // console.log('key value : ' + firstKeyValue);

            deadCreepRole = Memory.creepInfo[currentRoomName].roomCreepSpawnQueue[firstKeyValue].role;

            // If the dead creep's role is not in demand remove it from the queue
            console.log('number alive : ' + (deadCreepRole + 's'));
            console.log(Memory.creepInfo[currentRoomName]);
            console.log(Memory.creepInfo[currentRoomName][deadCreepRole + 's']);
            console.log(Memory.creepInfo[currentRoomName][deadCreepRole + 's'].numberAliveNow);
            // TODO
            // adjust the roleNumber in memory !!!!!!!!!??
            // shift(roomSpawnQueue);
            console.log('shifting room spawn queue');
            delete Memory.creepInfo[currentRoomName].roomCreepSpawnQueue[firstKeyValue];
        }
        


    }

    if(
           Memory.creepInfo[currentRoomName].roomCreepSpawnQueue == {}
        || Memory.creepInfo[currentRoomName].roomCreepSpawnQueue == []
        || Memory.creepInfo[currentRoomName].roomCreepSpawnQueue.length == 0
    ) {

        let firstKeyValue = Object.keys(Memory.creepInfo[currentRoomName])[0];
        let roleToFill = Memory.creepInfo[currentRoomName][firstKeyValue];

        let currentRoleNum = Memory.creepInfo[currentRoomName][roleToFill + 's'].currentRoleNumber;

        replacementRoleNumber = currentRoleNum;
        Memory.creepInfo[currentRoomName][deadCreepRole + 's'].currentRoleNumber = currentRoleNum + 1;
        

        console.log('should be actually');
        console.log('Working on a new ' + deadCreepRole + ': ' + newName);

        Game.spawns[spawnName].spawnCreep(bodyPartsArray, newName, {
            memory: {
                roomCreated: currentRoomName,
                role: roleToFill,
                roleNumber: currentRoleNum
            }
        });
    }

    else {
        console.log('LOOKING AT ROOM SPAWN REQUIREMENTS');

        let newCreepRole = 'harvester';

        let rcLevel = 'rc' + Game.rooms[currentRoomName].controller.level;
        
        let firstKeyValue = Object.keys(Memory.creepInfo[currentRoomName].roomCreepSpawnQueue)[0];

        let bodyPartsArray = Memory.creepInfo[currentRoomName][newCreepRole + 's'].bodyParts[rcLevel];
        // console.log('controller level is: ' + rcLevel);
        console.log(bodyPartsArray);

        console.log(Memory.creepInfo[currentRoomName]);
        console.log(Memory.creepInfo[currentRoomName][newCreepRole + 's']);
        let newRoleNumber = Memory.creepInfo[currentRoomName][newCreepRole + 's'].roleNumber;
        // console.log(replacementRoleNumber);

        let newName = newCreepRole + newRoleNumber;

        if (
            newRoleNumber === 0 ||
            newRoleNumber == undefined ||
            newRoleNumber == null
        ) {
            let currentRoleNum = Memory.creepInfo[currentRoomName][newCreepRole + 's'].currentRoleNumber;
            newRoleNumber = currentRoleNum;
            Memory.creepInfo[currentRoomName][newCreepRole + 's'].currentRoleNumber = currentRoleNum + 1;
        }


        console.log('Working on a new ' + newCreepRole + ': ' + newName);

        Game.spawns[spawnName].spawnCreep(bodyPartsArray, newName, {
            memory: {
                roomCreated: currentRoomName,
                role: newCreepRole,
                roleNumber: newRoleNumber
            }
        });
    }


    
}


module.exports = autoSpawning;