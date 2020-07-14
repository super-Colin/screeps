

function cityPlanNewExtensions(creep, debugLevel = 0) {
    if(debugLevel > 3){console.log("task.cityPlanNewExtensions is looking for a spot");}

    creep.memory.task = 'cityPlanNewExtensions';

    // FIND A SPOT TO BUILD THE EXTENSTION
    let spawnCoords = creep.room.find(FIND_MY_SPAWNS)[0].pos;


    // SPIRAL VARS
    let spiralX = 0;
    let spiralY = 0;

    let directionMoving = 1;
    let distanceFromCenter = 0.5;

    // DENSITY OF THE EXTENSIONS
    let stepDistance = 2;

    if(debugLevel > 3){console.log('Entering spiral while loop ... to/in cityPlan.newExtensions')};
    

    if(debugLevel > 2){console.log('extension planning spiral loop iterations will be : ' + creep.room.controller.level)};
    let spiralLoopIterations = creep.room.controller.level;
    
    let i = 0;
    while (i < spiralLoopIterations) {
        // TRACE OUT A SPIRAL IN THE GIRD CENTERED AROUND SPAWN
        // console.log('inside while loop');

        // X AXIS
        while (spiralX * directionMoving < distanceFromCenter) {
            if(debugLevel > 3){console.log('spiral check spot is now at : ' + spiralX + ',' + spiralY)};

            spiralX += directionMoving * stepDistance;

            let checkSpot = new RoomPosition((spawnCoords.x + spiralX), (spawnCoords.y + spiralY), creep.memory.homeRoom);
            if (checkSpot.createConstructionSite(STRUCTURE_EXTENSION) == ERR_INVALID_TARGET){
                console.log('invalid spot');
            }else{
                checkSpot.createConstructionSite(STRUCTURE_EXTENSION);
            }

        }
        // Y AXIS
        while (spiralY * directionMoving < distanceFromCenter) {
            if(debugLevel > 3){console.log('spiral check spot is now at : ' + spiralX + ',' + spiralY);};

            spiralY += directionMoving * stepDistance;

            let checkSpot = new RoomPosition((spawnCoords.x + spiralX), (spawnCoords.y + spiralY), creep.memory.homeRoom);
            if (checkSpot.createConstructionSite(STRUCTURE_EXTENSION) == ERR_INVALID_TARGET) {
                console.log('invalid spot');
            } else {
                checkSpot.createConstructionSite(STRUCTURE_EXTENSION);
            }

        }
        directionMoving *= -1;
        distanceFromCenter += stepDistance;
        i++;
    };


    

}


module.exports = cityPlanNewExtensions;


