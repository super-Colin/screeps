const configs = require("./main.config");

const planSourceRoads = require('./task.planSourceRoads');
const planEnergyStorage = require('./task.planEnergyStorage');
const planCity = require('./task.planCity');

const harvestEnergy = require('./task.harvestEnergy');
const buildStuff = require('./task.buildStuff');
const upgradeRoom = require('./task.upgradeRoom');


let plannerBehavior = {

    /** @param {Creep} creep **/
    general: function (creep, hivemind) {
        // init creep task memory
        if( creep.memory.task == undefined){
            creep.memory.task = "plan";
            creep.say('🔆 Hello!');

            // setup memory of the home city to keep track of what has already been planned
            if( Memory.cityPlanning == undefined ){
                Memory.cityPlanning = {};
            }
            if( Memory.cityPlanning[creep.room.name] == undefined ){
                let newRoomPlans =  {
                    "city": {"level":0},
                    "energyStorage": {"level":0},
                    "roads": {"level":0},
                    "bunkers": {"level":0},
                    "ramparts": {"level":0},
                };
                Memory.cityPlanning[creep.room.name] = newRoomPlans;
            }
        }
        hivemind[creep.memory.role][creep.id] = {};
        if(Game.time % configs.ticksBetweenRoomPlanningCheck == 0){
            creep.memory.task = "plan";
        }
        switch(creep.memory.task){
            case "upgradeRoom":
                if( upgradeRoom(creep) ){
                    break;
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "empty"){
                        creep.memory.task = "plan";
                    }else if(creep.memory.status == "blocked"){
                        creep.memory.task = "plan";
                    }
                }


            case "plan":
            case "planRoads":
                if( Memory.cityPlanning[creep.room.name].roads.level == 0 ){
                    if( planSourceRoads.toSpawn(creep, hivemind) ){
                        Memory.cityPlanning[creep.room.name].roads.level ++; // ++
                        break;
                    }
                }
                if( Memory.cityPlanning[creep.room.name].roads.level == 1 && creep.room.controller.level > 1){
                    if( planSourceRoads.toController(creep, hivemind) ){
                        Memory.cityPlanning[creep.room.name].roads.level ++; // ++
                        break;
                    }
                }

            case "planEnergyStorage":
                if( Memory.cityPlanning[creep.room.name].energyStorage.level == 0 ){
                    console.log("Planning energy storage level 1")
                    if( planEnergyStorage.aroundSpawn(creep, hivemind, 1 ) ){
                        if(creep.memory.status == "done"){
                            console.log("Planning energy storage level 1 DONE");
                            planEnergyStorage.aroundSpawn(creep, hivemind, 2 );
                        }
                        Memory.cityPlanning[creep.room.name].energyStorage.level ++ ;
                        break;
                    }
                    if( planEnergyStorage.aroundSpawn(creep, hivemind, 2 ) ){
                        if(creep.memory.status == "done"){
                            Memory.cityPlanning[creep.room.name].energyStorage.level ++ ;
                        }
                        break;
                    }
                }
                if( Memory.cityPlanning[creep.room.name].energyStorage.level == 1 ){
                    console.log("Planning energy storage level 2")
                    if( planEnergyStorage.aroundSpawn(creep, hivemind, 2 ) ){
                        if(creep.memory.status == "done"){
                            console.log("Planning energy storage level 2 DONE")
                            Memory.cityPlanning[creep.room.name].energyStorage.level ++ ;
                        }
                        break;
                    }
                }

            case "buildStuff":
                if( buildStuff(creep, (s)=>{return (s.structureType == STRUCTURE_EXTENSION)}) ){
                    break;
                }else if( buildStuff(creep, (s)=>{return (s.structureType == STRUCTURE_ROAD)}) ){
                    break;
                }else if( buildStuff(creep) ){
                    break;
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "empty"){
                        creep.memory.task = "withdrawEnergy";
                    }else if(creep.memory.status == "blocked"){
                        creep.memory.task = "upgradeRoom";
                    }else if(creep.memory.status == "none"){
                        creep.memory.task = "upgradeRoom";
                    }
                }

            case "harvestEnergy":
                if( harvestEnergy(creep) ){
                    break;
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "full"){
                        creep.memory.task = "buildStuff";
                    }else if(creep.memory.status == "blocked"){
                        creep.memory.task = "buildStuff";
                    }
                }


            // reset task to default if not sure what happened
            default:
                creep.memory.task = "plan";
        }

    },




    defensive: function (creep, hivemind) {
    },



};

module.exports = plannerBehavior;