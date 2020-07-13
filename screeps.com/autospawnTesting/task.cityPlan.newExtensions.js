

function cityPlanNewExtensions(creep, debugLevel = 0) {
    if(debugLevel > 3){console.log("task.cityPlanNewExtensions is looking for a spot");}

    creep.memory.task = 'cityPlanNewExtensions';

    // FIND A SPOT TO BUILD THE EXTENSTION
    let spawnCoords = creep.room.find(FIND_MY_SPAWNS)[0].pos;
    
    
    
    


    // SPIRAL VARS
    let checkSpotX, checkSpotY;

    let spiralX = 0;
    let spiralY = 0;

    let directionMoving = 1;
    let distanceFromCenter = 0.5;

    // DENSITY OF THE EXTENSIONS
    let stepDistance = 2

    let freeSpot;
    let freeSpotFound = false
    
    console.log('Entering spiral while loop ... to/in cityPlan.newExtensions');
    do{
        // TRACE OUT A SPIRAL IN THE GIRD CENTERED AROUND SPAWN

        // X AXIS
        while(spiralX * directionMoving < distanceFromCenter){

            console.log('spiral check spot is : ' + spiralX + ',' + spiralY);
            let checkSpot = new RoomPosition(checkSpotX, checkSpotY, creep.memory.homeRoom);

            // IF THE CHECK SPOT IS AN INVALID TARGET MOVE TO THE NEXT SPOT
            if (checkSpot.createConstructionSite(STRUCTURE_EXTENSION) == ERR_INVALID_TARGET) {
                console.log('checkSpot is invalid target');
            } else{
                checkSpot.createConstructionSite(STRUCTURE_EXTENSION);
                freeSpotFound = true;
            }
            checkSpotX += directionMoving * stepDistance;
        }


        directionMoving *= -1;
        distanceFromCenter += stepDistance;





            console.log('free spot :');

            console.log(freeSpot);
            freeSpotFound = true;
            if(distanceFromCenter > 20){
                console.log('spiral loop is breaking')
                freeSpotFound = true;
            }

    }while(freeSpotFound == false);



    

}


module.exports = cityPlanNewExtensions;


