const configs = require("main.config");

function storeEnergy(creep, useClosest = true) {
    if( creep.memory.status != "storing" || creep.memory.targetId == undefined ){
        creep.memory.task = "storeEnergy"
        creep.memory.status = "storing"
        creep.say('💲 Storing Energy');

// const extensions = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES, {
//     filter: { structureType: STRUCTURE_EXTENSION }
// });
// console.log('Spawn has '+extensions.length+' extensions available');

        var energyStores = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_STORAGE ||
                    // structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });


        let closestByPath = creep.pos.findClosestByPath(energyStores)
        console.log("closest energy store is : " + energyStores.length)
        console.log(closestByPath)


        if(useClosest || energyStores.length == 1){
            console.log("setting creep targetId for storing")
            console.log(closestByPath.id)
            creep.memory.targetId = closestByPath.id;
        }else{
            let otherEnergyStores = creep.room.find(FIND_SOURCES_ACTIVE, {
                filter: (structure) => {
                    return (structure.id != closestByPath.id);
                }
            });
            // console.log("other sources are: ")
            // console.log(otherEnergyStores)


            if (otherEnergyStores.length > 0) {
                // pick a random source to use as target... I know it's bad..
                console.log("setting creep targetId for harvesting")
                creep.memory.targetId = otherEnergyStores[Math.floor(Math.random() * otherEnergyStores.length)].id;
            }else{
                creep.memory.status = "blocked";
                return false;
            }
        }




    }




    // // if the creep is empty, stop storing
    // if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
    //     creep.memory.status = "empty";
    //     return false;
    // } // ... else{

    let creepTarget = Game.getObjectById(creep.memory.targetId);
    console.log("creepTarget is: ");
    console.log(creepTarget);
    let workResult = creep.transfer(creepTarget, RESOURCE_ENERGY);
    console.log("workResult is: ");
    console.log(workResult);

    switch(workResult){
        case OK:
            creep.memory.status = "storing";
            return true;
        case ERR_NOT_ENOUGH_RESOURCES:
            creep.memory.status = "empty";
            return false;
        case ERR_FULL:
            creep.memory.status = "blocked";
            return false;
        // try to move to it
        case ERR_NOT_IN_RANGE:
            let walkResult = creep.moveTo(creepTarget, {visualizePathStyle: {stroke: configs.colors.paths.energy}});
            if(walkResult == ERR_NO_PATH){
                creep.memory.status = "blocked";
                return false;
            }
            creep.memory.status = "storing";
            return true;
    }








    // if (energyStores.length > 0) {
    //     if (creep.transfer(energyStores[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //         creep.moveTo(energyStores[0], {visualizePathStyle: {stroke: configs.colors.paths.energy}});
    //         return true;
    //     }
    // } else {
    //     console.log('There is nowhere to store more energy in this room');
    //     return false; // return false so we know we can do something else
    // }
}






module.exports = storeEnergy;