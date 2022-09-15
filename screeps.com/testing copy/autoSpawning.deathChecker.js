
function deathChecker(ticksBetweenChecks = 3){

    // Check for memory leaks every so many ticks ticks
    if (Game.time % ticksBetweenChecks === 0) {

        // check for dead creeps and clear from memory to prevent memory leaks
        for (let name in Memory.creeps) {

            if (!Game.creeps[name]) {

                console.log('deleted role was ' + creep[name].memory.role);

                let deadCreepHomeRoom = creep[name].memory.homeRoom;

                let deadCreepRoleNumber;
                if (creep[name].memory.roleNumber) {
                    deadCreepRoleNumber = creep[name].memory.roleNumber;
                } else{
                    deadCreepRoleNumber = 0;
                }

                let replacementCreep = {
                    roleName: creep[name].memory.role,
                    roleNumber: deadCreepRoleNumber,
                    homeRoom: deadCreepHomeRoom 
                };

                Memory.creepInfo[deadCreepHomeRoom].roomCreepSpawnQueue.push(replacementCreep);
                console.log('pushed replacement creep to spawn queue');

                delete Memory.creeps[name];
                console.log('Cleared non-existing creep memory: ', name);
            }
        }

    }

}

module.exports = deathChecker;