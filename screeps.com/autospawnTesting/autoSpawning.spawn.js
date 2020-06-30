

function roomAutoSpawning(currentSpawnName, currentRoomName, rcLevel, ticksBetweenChecks = 3, debugLog) {
    if (debugLog == true) {console.log('!>- Starting roomAutoSpawning function -<!');}

    const creepRolesInfo = Memory.creepMetaInfo.creepRoles;

    for(let roleName in creepRolesInfo){

        console.log(typeof(roleName));
        console.log(roleName);


        const roleGroup = _.filter(Game.creeps, (creep) => 
           creep.memory.role == roleName 
        && creep.memory.homeRoom == currentRoomName
        );


        console.log(roleName + 's: ' + roleGroup.length + ' / ' + creepRolesInfo[roleName][rcLevel].numberToMaintain);


        if(roleGroup.length < Memory.creepMetaInfo.creepRoles[roleName][rcLevel].numberToMaintain){
            let newName = roleName + Game.time;
            console.log('Working on a new ' + roleName + ': ' + newName);

            Game.spawns[currentSpawnName].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, {
                memory: {
                    taskObject: 'none',
                    role: roleName,
                    roleNumber: 1,
                    roomCreated: currentRoomName,
                    homeRoom: currentRoomName
                }
            });
            break;
        }

    };




    if (debugLog == true) {console.log('!> Ending roomAutoSpawning function <!');}
}

module.exports = roomAutoSpawning;