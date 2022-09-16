const configs = require("main.config");


function findPaths_controllerToSources(creep){
    let sources = creep.room.find(FIND_SOURCES);
    console.log("[planRoad] sources total: " + sources.length);
    let allPaths = [];
    for(let i in sources){
        let roadPath = creep.room.findPath(creep.room.controller.pos, {"pos":sources[i].pos, "range":1}, {"swampCost":1, "maxOps":4000, "maxRooms":1});
        configs.debugLevel >= 7 ? console.log("[planRoad] path is: ") :'';
        configs.debugLevel >= 7 ? console.log(JSON.stringify(roadPath)) :'';

        allPaths.push(roadPath);
    }
    return allPaths;
}
function findPaths_spawnToSources(creep){
    let sources = creep.room.find(FIND_SOURCES);
    console.log("[planRoad] sources total: " + sources.length);
    let spawns = creep.room.find(FIND_MY_SPAWNS);
    let allPaths = [];
    for(let i in sources){
        let roadPath = creep.room.findPath(spawns[0].pos, {"pos":sources[i].pos, "range":1}, {"swampCost":1, "maxOps":4000, "maxRooms":1});
        configs.debugLevel >= 7 ? console.log("[planRoad] path is: ") :'';
        configs.debugLevel >= 7 ? console.log(JSON.stringify(roadPath)) :'';

        allPaths.push(roadPath);
    }
    return allPaths;
}



function planRoadFromPath_inRoom(inputPath, roomName){
    console.log("putting down construction sites in room: "+ roomName + ", receiving: ");
    console.log(inputPath);

    for(let ithStep = 0; ithStep < inputPath.length; ithStep++){
        // console.log("looping")
        let position = new RoomPosition(inputPath[ithStep].x, inputPath[ithStep].y, roomName);
        // inputPath[ithStep].x
        let result = position.createConstructionSite(STRUCTURE_ROAD);
        if(result != OK){
            console.log("[planRoad]error in planRoadFromPath_inRoom: "+result)
        }
    }
}

function planSourceRoads_toController(creep, hivemind){
    let roadPaths = findPaths_controllerToSources(creep);
    console.log("[planRoad] paths total: "+ roadPaths.length);
    console.log(roadPaths);

    for(let i = 0; i < roadPaths.length; i++){
        console.log("[planRoad] accessing: "+ i);

        planRoadFromPath_inRoom(roadPaths[i], creep.room.name);
    }
    creep.memory.status = "done";
    return true;
}

function planSourceRoads_toSpawn(creep, hivemind){
    let roadPaths = findPaths_spawnToSources(creep);
    console.log("[planRoad] paths total: "+ roadPaths.length);
    console.log(roadPaths);

    for(let i = 0; i < roadPaths.length; i++){
        console.log("[planRoad] accessing: "+ i);

        planRoadFromPath_inRoom(roadPaths[i], creep.room.name);
    }
    creep.memory.status = "done";
    return true;
}



module.exports = {
    "toController":planSourceRoads_toController,
    "toSpawn":planSourceRoads_toSpawn,
};











// function findPath_throughWalls(origin, goals){


//  let ret = PathFinder.search(
//     origin, goals,
//     {
//       // We need to set the defaults costs higher so that we
//       // can set the road cost lower in `roomCallback`
//         plainCost: 1,
//         swampCost: 1,

//         roomCallback: function(roomName) {

//             let room = Game.rooms[roomName];
//             // In this example `room` will always exist, but since 
//             // PathFinder supports searches which span multiple rooms 
//             // you should be careful!
//             if (!room) return;
//             let costs = new PathFinder.CostMatrix;

//             room.find(FIND_STRUCTURES).forEach(function(struct) {
//                 if (struct.structureType === STRUCTURE_ROAD) {
//                     // Favor roads over plain tiles
//                     costs.set(struct.pos.x, struct.pos.y, 1);
//                 } else if (struct.structureType !== STRUCTURE_CONTAINER &&
//                     (struct.structureType !== STRUCTURE_RAMPART ||
//                     !struct.my)) {
//                 // Can't walk through non-walkable buildings
//                 costs.set(struct.pos.x, struct.pos.y, 0xff);
//                 }
//             });

//             // Avoid creeps in the room
//             room.find(FIND_CREEPS).forEach(function(creep) {
//                 costs.set(creep.pos.x, creep.pos.y, 0xff);
//             });

//             return costs;
//         },
//     }
//   );

//   let pos = ret.path[0];
//   creep.move(creep.pos.getDirectionTo(pos));
// }
