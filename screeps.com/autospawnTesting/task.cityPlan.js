const cityPlanNewExtensions = require('./task.cityPlan.newExtensions');


function cityPlan(creep, debugLevel = 0) {
    creep.memory.task = 'cityPlan';

    // CHECK IF THE ROOM CAN HOLD ANY MORE EXTENSIONS

    // let currentExtensionConstructions = _.filter(Game.constructionSites, (site) =>{site.structureType == "extension"});
    let currentExtensionConstructions = 0;
    for(let site in Game.constructionSites){
        if (Game.constructionSites[site].structureType == "extension") {
            currentExtensionConstructions++;
        }
    };


    
    let currentExtensionsBuilt = creep.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION }}).length;
    let currentExtensionCount = currentExtensionsBuilt + currentExtensionConstructions;

    let maxExtensionCount = CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][creep.room.controller.level];
    console.log(CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][creep.room.controller.level]);

    console.log("extensions in construction : " + currentExtensionConstructions);
    console.log("extensions built : " + currentExtensionsBuilt);
    console.log("max extensions : " + maxExtensionCount);

    if(debugLevel > 3){console.log('current extensions and max extensions : ' + currentExtensionCount + '/' + maxExtensionCount);}

    // IF IT CAN FIND SPOTS TO CREATE EXTENSION CONSTRUCTION SITES
    if(+currentExtensionCount < +maxExtensionCount){
        if(debugLevel > 3){console.log("task.cityPlan would like to build a new extension");}
        cityPlanNewExtensions(creep, debugLevel);
        return true;
    }

}


module.exports = cityPlan;
