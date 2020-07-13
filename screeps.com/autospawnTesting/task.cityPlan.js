const cityPlanNewExtensions = require('./task.cityPlan.newExtensions');


function cityPlan(creep, debugLevel = 0) {
    creep.memory.task = 'cityPlan';

    // CHECK IF THE ROOM CAN HOLD ANY MORE EXTENSIONS
    let currentExtensionCount = creep.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION }}).length;
    let maxExtensionCount = CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][creep.room.controller.level];
    if(debugLevel > 3){console.log('current extensions and max extensions : ' + currentExtensionCount + '/' + maxExtensionCount);}

    // IF IT CAN FIND SPOTS TO CREATE EXTENSION CONSTRUCTION SITES
    if(+currentExtensionCount < +maxExtensionCount){
        if(debugLevel > 3){console.log("task.cityPlan would like to build a new extension");}
        cityPlanNewExtensions(creep, debugLevel);
        return true;
    }

}


module.exports = cityPlan;


