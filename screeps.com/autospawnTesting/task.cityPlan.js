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


    if(debugLevel > 3){
        console.log("extensions in construction : " + currentExtensionConstructions);
        console.log('current extensions / max extensions : ' + currentExtensionCount + '/' + maxExtensionCount);
    }

    // IF IT CAN FIND SPOTS TO CREATE EXTENSION CONSTRUCTION SITES
    if(+currentExtensionCount < +maxExtensionCount){
        if(debugLevel > 3){console.log("task.cityPlan would like to build a new extension");}
        // THEN CREATE CONSTRUCTION SITES
        cityPlanNewExtensions(creep, debugLevel);
        return true;
    }

}


module.exports = cityPlan;
