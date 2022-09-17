const configs = require("main.config");



function planEnergyStorage_aroundSpawn(creep, hivemind, level){
    
    if( creep.memory.status != "planning" || creep.memory.targetId == undefined ){
        creep.memory.task = "planEnergyStorage"
        creep.say('🏗️ Storage');
    }
    let spawnPos = creep.room.find(FIND_MY_SPAWNS)[0].pos;
    let created = 0;
    let maxReached = false;
    let results = [];
    let extensionSpots = [];
    if(level == 1){
        extensionSpots = [
            new RoomPosition(spawnPos.x, (spawnPos.y - 2), spawnPos.roomName),
            new RoomPosition(spawnPos.x, (spawnPos.y + 2), spawnPos.roomName),
            new RoomPosition((spawnPos.x - 2), spawnPos.y, spawnPos.roomName),
            new RoomPosition((spawnPos.x + 2), spawnPos.y, spawnPos.roomName),
        ];
    }else if(level == 2){
        extensionSpots = [
            new RoomPosition((spawnPos.x - 1), (spawnPos.y - 3), spawnPos.roomName),
            new RoomPosition((spawnPos.x + 1), (spawnPos.y - 3), spawnPos.roomName),
            new RoomPosition((spawnPos.x - 1), (spawnPos.y + 3), spawnPos.roomName),
            new RoomPosition((spawnPos.x + 1), (spawnPos.y + 3), spawnPos.roomName),
            new RoomPosition((spawnPos.x - 3), (spawnPos.y - 1), spawnPos.roomName),
            new RoomPosition((spawnPos.x - 3), (spawnPos.y + 1), spawnPos.roomName),
            new RoomPosition((spawnPos.x + 3), (spawnPos.y - 1), spawnPos.roomName),
            new RoomPosition((spawnPos.x + 3), (spawnPos.y + 1), spawnPos.roomName),
        ];
    }

    console.log("Energy storage spots: ");
    console.log(JSON.stringify(extensionSpots));
    // try to set construction sites
    for(let i = 0; i < extensionSpots.length; i++){
        results.push(extensionSpots[i].createConstructionSite(STRUCTURE_EXTENSION));
    }
    // tally results
    for(let i = 0; i < results.length; i++){
        console.log(results[i])
        if(results[i] == OK){
            created ++ ;
        }else if(results[i] == ERR_RCL_NOT_ENOUGH){
            maxReached = true;
        }
    }


    if( maxReached ){
        console.log("Created "+ created +" extensions; max reached");
        creep.memory.status = "done";
        return true;
    }else if(created > 0){
        console.log("Created construction sites for "+ created +" extensions around spaawn")
        creep.memory.status = "planning";
        return true;
    }
    creep.memory.status = "none";
    return false;
}



module.exports = {
    "aroundSpawn":planEnergyStorage_aroundSpawn,
    // "toSpawn":planSourceRoads_toSpawn,
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
