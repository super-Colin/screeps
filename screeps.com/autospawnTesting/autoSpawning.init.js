


function autoSpawningInit(debugLog = 0){

    if (debugLog == true) {console.log('!AutoSpawn Init is Firing!~~~~~~~~~~~~~~~~~~~~~~~')};
    
    if(Memory.creepMetaInfo == undefined){
        if (debugLog == true) {console.log('defining creep meta info');}

        Memory.creepMetaInfo = {};
    }
    if (Memory.creepMetaInfo.creepRoles == undefined) {
        if (debugLog == true) {console.log('defining creep meta, creep roles');}

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

        // 



    }



    if (debugLog == true) {console.log('!AutoSpawn Init is DONE!~~~~~~~~~~~~~~~~~~~~~~~')};
}




module.exports = autoSpawningInit;