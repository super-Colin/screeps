
    // SPIRAL VARS
    let spiralX = 0;
    let spiralY = 0;

    let directionMoving = 1;
    let distanceFromCenter = 0.5;

    // DENSITY OF THE EXTENSIONS
    let stepDistance = 1;

    let freeSpot;
    let freeSpotFound = false

    console.log('Entering spiral while loop ... to/in cityPlan.newExtensions');
    let spotsToMap = 2;
    let i = 0;
    // HOW MANY SPOTS TO MAP OUT
    while (i < spotsToMap)  {
        // TRACE OUT A SPIRAL IN THE GIRD CENTERED AROUND SPAWN
        // console.log('inside while loop');
        // X AXIS
        while (spiralX * directionMoving < distanceFromCenter) {
            // console.log('spiral check spot is : ' + spiralX + ',' + spiralY);
            spiralX += directionMoving * stepDistance;
            console.log('spiral check spot is now at : ' + spiralX + ',' + spiralY);
        }
        while (spiralY * directionMoving < distanceFromCenter) {
            // console.log('spiral check spot is : ' + spiralX + ',' + spiralY);
            spiralY += directionMoving * stepDistance;
            console.log('spiral check spot is now at : ' + spiralX + ',' + spiralY);
        }
        directionMoving *= -1;
        distanceFromCenter += stepDistance;
        i++;
    };
