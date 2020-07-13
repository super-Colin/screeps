
// THE MAIN SPAWNING FUNCTION
// 
function roomAutoSpawning(currentSpawnName, currentRoomName, rcLevel, ticksBetweenChecks = 3, debugLog = 0) {
    if (debugLog > 0) {console.log('!>- Starting roomAutoSpawning function -<!');}

    // GET JSON DATA ABOUT OUR ROLES AND NUMBER TO MAINTAIN
    // WHICH WAS HANDLED BY AUTOSPAWN INIT
    const creepRolesInfo = Memory.creepMetaInfo.creepRoles;

    // LOOP THROUGH EACH ROLE AND SEE WHAT NEEDS TO BE SPAWNED
    for(let roleName in creepRolesInfo){

        // CHECK HOW MANY CREEPS WITH THIS ROLE AND THIS HOME ROOM, ALIVE NOW
        const roleGroup = _.filter(Game.creeps, (creep) => 
           creep.memory.role == roleName 
        && creep.memory.homeRoom == currentRoomName
        );
        const roleNumberToMaintain = Memory.creepMetaInfo.creepRoles[roleName][rcLevel].numberToMaintain;

        // LOG HOW MANY OF THIS ROLE ARE ALIVE / HOW MANY SHOULD BE ALIVE
        console.log(roleName + 's: ' + roleGroup.length + ' / ' + creepRolesInfo[roleName][rcLevel].numberToMaintain);



        // IF FEWER OF THIS ARE ALIVE THAN SHOULD BE, SPAWN ONE OF THIS ROLE
        if(roleGroup.length < roleNumberToMaintain){
            if(debugLog > 2){console.log('roleGroup is: ');console.log(roleGroup)};

            let roleNumber = 1;
            // LOOP THROUGH THE ROLE GROUP 
            for(let i = 0; i < roleNumberToMaintain; i++){

                // CHECKING FOR THE FIRST MISSING ROLE NUMBER TO FILL
                if(roleGroup[i] != undefined){

                    let creepNameObject = roleGroup[i].name.split(' ');
                    const checkAgainstRoleNum = creepNameObject[creepNameObject.length - 1];

                    // IF NUMBER IS LESS THAN MAX AND NOT OUR CURRENT NUMBER IT WILL WORK
                    if (roleNumber != checkAgainstRoleNum && checkAgainstRoleNum <= roleNumberToMaintain) {
                        // SO BREAK OUT OF THE FOR LOOP
                        break;
                    }else{
                        // OTHERWISE TRY THE NEXT NUMBER
                        roleNumber++;
                    }

                    if(debugLog > 2){console.log('checkAgainstRoleNum is : ' + checkAgainstRoleNum);}


                }
                
            }
 
    

            

            let newName = roleName + ' ' + roleNumber;
            console.log('Going to make a new ' + roleName + ' : ' + newName);

            Game.spawns[currentSpawnName].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], newName, {
            // Game.spawns[currentSpawnName].spawnCreep(Memory.creepMetaInfo.creepRoles[roleName][rcLevel].bodyParts, newName, {
                memory: {
                    taskObject: 'none',
                    role: roleName,
                    roleNumber: roleNumber,
                    roomCreated: currentRoomName,
                    homeRoom: currentRoomName
                }
            });
            break;
        }

    };




    if (debugLog > 0) {console.log('!> Ending roomAutoSpawning function <!');}
}

module.exports = roomAutoSpawning;