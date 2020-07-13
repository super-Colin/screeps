

// MAKE SURE META INFORMATION IS STORED FOR SPAWNS
function autoSpawningInit(debugLog = 0){
    // CHECK FOR META INFO
    if (debugLog > 0) {console.log('!AutoSpawn Init Is Firing!~~~~~~~~~~~~~~~~~~~~~~~')};

    
    if(Memory.creepMetaInfo == undefined){
        if (debugLog > 1) {console.log('defining creep meta info');}
        Memory.creepMetaInfo = {};
    }
    // IF META INFO IS THERE INGORE THE REST OF THE FUNCTION
    if (Memory.creepMetaInfo.creepRoles != undefined) {
        if (debugLog > 1) {
            console.log('!AutoSpawn Init Wasn\'t Needed! Returning~~~~~')
        };
        return;
    }

    if (Memory.creepMetaInfo.creepRoles == undefined) {
        if (debugLog > 1) {console.log('defining creep meta, creep roles');}

        // PUT
        // CREEP ROLES AND ASSOCIATED BODY PART ARRAYS AT DIFFERENT ROOM LEVELS
        // INTO MEMORY
        Memory.creepMetaInfo.creepRoles = {

            harvester: {
                roleName: 'harvester',
                rc1:{
                    numberToMaintain: 3,
                    bodyParts: [WORK, CARRY, MOVE, MOVE]
                },
                rc2:{
                    numberToMaintain: 4,
                    bodyParts: [WORK, CARRY, CARRY, CARRY, MOVE]
                },
                rc3:{
                    numberToMaintain: 5,
                    bodyParts: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
                },
                rc4:{
                    numberToMaintain: 6,
                    bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
                }
            },
            
            builder: {
                roleName: 'builder',
                rc1:{
                    numberToMaintain: 3,
                    bodyParts: [WORK, CARRY, MOVE, MOVE]
                },
                rc2:{
                    numberToMaintain: 4,
                    bodyParts: [WORK, CARRY, CARRY, MOVE, MOVE]
                },
                rc3:{
                    numberToMaintain: 5,
                    bodyParts: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
                },
                rc4:{
                    numberToMaintain: 6,
                    bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
                }
            },

            workbot: {
                roleName: 'workbot',
                rc1:{
                    numberToMaintain: 3,
                    bodyParts: [WORK, CARRY, MOVE, MOVE]
                },
                rc2:{
                    numberToMaintain: 4,
                    bodyParts: [WORK, CARRY, CARRY, MOVE, MOVE]
                },
                rc3:{
                    numberToMaintain: 5,
                    bodyParts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
                },
                rc4:{
                    numberToMaintain: 6,
                    bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
                }
            },

            upgrader: {
                roleName: 'upgrader',
                rc1:{
                    numberToMaintain: 3,
                    bodyParts: [WORK, CARRY, MOVE, MOVE]
                },
                rc2:{
                    numberToMaintain: 4,
                    bodyParts: [WORK, CARRY, CARRY, MOVE, MOVE]
                },
                rc3:{
                    numberToMaintain: 5,
                    bodyParts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
                },
                rc4:{
                    numberToMaintain: 6,
                    bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
                }
            },

            roadbot: {
                roleName: 'roadbot',
                rc1:{
                    numberToMaintain: 3,
                    bodyParts: [WORK, CARRY, MOVE, MOVE]
                },
                rc2:{
                    numberToMaintain: 4,
                    bodyParts: [WORK, CARRY, CARRY, MOVE, MOVE]
                },
                rc3:{
                    numberToMaintain: 5,
                    bodyParts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
                },
                rc4:{
                    numberToMaintain: 6,
                    bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
                }
            },
            
            wallbot: {
                roleName: 'wallbot',
                rc1:{
                    numberToMaintain: 3,
                    bodyParts: [WORK, CARRY, MOVE, MOVE]
                },
                rc2:{
                    numberToMaintain: 4,
                    bodyParts: [WORK, CARRY, CARRY, MOVE, MOVE]
                },
                rc3:{
                    numberToMaintain: 5,
                    bodyParts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
                },
                rc4:{
                    numberToMaintain: 6,
                    bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
                }
            },
        };
    } // </if>


    if (debugLog > 0) {console.log('!AutoSpawn Init is DONE!~~~~~~~~~~~~~~~~~~~~~~~')};
}




module.exports = autoSpawningInit;