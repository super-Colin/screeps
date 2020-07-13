
// ALL THE META INFORMATION FOR ANY USED ROLES
// ROLES MUST BE IMPORTED / REQUIRE()'D WITH THE EXACT ROLE NAME
const harvester = require('./role.harvester.init');
const builder = require('./role.builder.init');

// MAKE SURE META INFORMATION IS STORED FOR SPAWNS
// IF DEBUG LEVEL IS 5 OR ABOVE IT WILL RE-INIT THE META INFO
function autoSpawningInit(debugLevel = 0){
    // CHECK FOR META INFO
    if (debugLevel > 0) {console.log('!AutoSpawn Init Is Firing!~~~~~~~~~~~~~~~~~~~~~~~')};

    // 
    if(Memory.creepMetaInfo == undefined || debugLevel > 4){
        if (debugLevel > 1) {console.log('defining creep meta info');}
        Memory.creepMetaInfo = {};
    }
    // IF META INFO IS THERE INGORE THE REST OF THE FUNCTION
    if (Memory.creepMetaInfo.creepRoles != undefined && debugLevel <= 4) {
        if (debugLevel > 1) {
            console.log('!AutoSpawn Init Wasn\'t Needed! Returning~~~~~')
        };
        return;
    }

    if (Memory.creepMetaInfo.creepRoles == undefined || debugLevel > 4) {
        if (debugLevel > 1) {console.log('defining creep meta, creep roles');}

        // PUT CREEP ROLES AND ASSOCIATED BODY PART ARRAYS AT DIFFERENT ROOM LEVELS INTO MEMORY
        Memory.creepMetaInfo.creepRoles = {

            // MUST BE IMPORTED/REQUIRE()'D WITH THE EXACT ROLE NAME
            harvester,
            
            builder
         
        };
    } // </if>


    if (debugLevel > 0) {console.log('!AutoSpawn Init is DONE!~~~~~~~~~~~~~~~~~~~~~~~')};
}




module.exports = autoSpawningInit;