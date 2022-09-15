const configs = require("../main.config");

const harvestEnergy = require('../task.harvestEnergy');


const upgradeRoom = require('../task.upgradeRoom');
const repairWallsRoads = require('../task.repairWallsRoads');
const repairWallsRoads = require('harvester.bodyParts');

let harvesterBehavior = {

    /** @param {Creep} creep **/
    run: function (creep) {
        // init creep task memory, start by harvesting some energy
        if( creep.memory.task == undefined){
            creep.memory.task = "harvest";
            creep.memory.status = "harvesting";
            creep.say('🌀 harvesting');
        }

        switch(creep.memory.task){
            case "harvestEnergy":
                if( harvestEnergy(creep) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...

                }
            case "storeEnergy":
                if( storeEnergy(creep) ){
                    break; //cascade through if one task can't be completed
                }
            case "repair":
                // if( storeEnergy(creep) ){
                //     break; //cascade through if one task can't be completed
                // }
            default:
                if(! harvestEnergy(creep)){
                    storeEnergy(creep)
                }
            break;
        }
    },




    run_defensively: function (creep) {
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