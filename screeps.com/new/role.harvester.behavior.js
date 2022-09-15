const configs = require("./main.config");

const harvestEnergy = require('./task.harvestEnergy');
const storeEnergy = require('./task.storeEnergy');
const upgradeRoom = require('./task.upgradeRoom');

// const repairWallsRoads = require('./task.repairWallsRoads');
// const repairWallsRoads = require('harvester.bodyParts');

let harvesterBehavior = {

    /** @param {Creep} creep **/
    general: function (creep) {
        // init creep task memory, start by harvesting some energy
        if( creep.memory.task == undefined){
            creep.memory.task = "harvestEnergy";
            creep.memory.status = "harvesting";
            creep.say('🌀 harvesting');
        }


        switch(creep.memory.task){
            case "harvestEnergy":
                if( harvestEnergy(creep) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "full"){
                        creep.memory.task = "storeEnergy";
                    }else if(creep.memory.status == "blocked"){
                        creep.memory.task = "upgradeRoom";
                    }
                }
            case "storeEnergy":
                if( storeEnergy(creep) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "empty"){
                        creep.memory.task = "harvestEnergy";
                    }else if(creep.memory.status == "blocked"){
                        creep.memory.task = "upgradeRoom";
                    }
                }
            case "upgradeRoom":
                if( upgradeRoom(creep) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "empty"){
                        creep.memory.task = "harvestEnergy";
                    }else if(creep.memory.status == "blocked"){
                        creep.memory.task = "storeEnergy";
                    }
                }
            default:
                // series of fallbacks
                // harvestEnergy() ? (storeEnergy() ? (upgradeRoom() ? : '') : '') : ''; // ???? nah, less readable.
                if(! harvestEnergy(creep)){
                    if(! storeEnergy(creep)){
                        if(! upgradeRoom(creep)){
                            // some fallback...
                        }
                    }
                }
        }
    },




    defensive: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            var source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {
                    visualizePathStyle: {
                        stroke: configs.colors.paths.energy
                    }
                });
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
            } else if (creep.store.getFreeCapacity() == 0 && targets.length == 0) {
                console.log('harvestors are bored and would like to upgrade');
                // console.log('harvestors are bored and upgrading');
                // upgradeRoom(creep);
                repairWallsRoads(creep);
            }
        }
    },



};

module.exports = harvesterBehavior;