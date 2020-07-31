

function cityPlanNewRoads(creep, debugLevel = 0) {
    if(debugLevel > 3){console.log("task.cityPlan.newRoads is looking for a path");}

    creep.memory.task = 'cityPlanNewRoads';


    let spawnCoords = creep.room.find(FIND_MY_SPAWNS)[0].pos;

    let energySources = creep.pos.find(FIND_SOURCES_ACTIVE);
    let roadStage = Memory.roadStage[creep.room.name];
    if (creep.memory.taskObject == undefined){creep.memory.taskObject = 0}


    if (creep.memory.taskObject < energySources.length 
        && roadStage == 1
        && creep.room == creep.memory.homeroom) {

        if (creep.harvest(energySources[creep.memory.taskObject]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(energySource, {visualizePathStyle: {stroke: '#000000'}});
            Game.rooms[creep.memory.homeroom].createConstructionSite(creep.pos.x, creep.pos.y, STRUCTURE_ROAD);
        }else{
            // If the creep is close enough to harvest, increment the task object
            creep.memory.taskObject += 1;
            // figure out how to make him walk back to spawn
        }

    }

    if (creep.memory.taskObject >= energySources.length){
        Memory.roadStage[creep.room.name] += 1;
    }





    

}


module.exports = cityPlanNewRoads;


