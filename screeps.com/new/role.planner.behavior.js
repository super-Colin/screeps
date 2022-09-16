const configs = require("./main.config");

const planSourceRoads = require('./task.planSourceRoads');
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
                    city: {"level":0},
                    roads: {"level":0},
                    bunkers: {"level":0},
                    ramparts: {"level":0},
                };
                Memory.cityPlanning[creep.room.name] = newRoomPlans;
            }
        }
        hivemind[creep.memory.role][creep.id] = {};

        switch(creep.memory.task){
            case "upgradeRoom":
                if( upgradeRoom(creep) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "empty"){
                        creep.memory.task = "withdrawEnergy";
                    }else if(creep.memory.status == "blocked"){
                        creep.memory.task = "storeEnergy";
                    }
                }


            case "plan":
            case "planRoads":
                if( Memory.cityPlanning[creep.room.name].roads.level == 0 ){
                    if( planSourceRoads.toSpawn(creep, hivemind) ){
                        Memory.cityPlanning[creep.room.name].roads.level ++; // ++
                        break; //cascade through if one task can't be completed
                    }
                }
                if( Memory.cityPlanning[creep.room.name].roads.level == 1 && creep.room.controller.level > 1){
                    if( planSourceRoads.toController(creep, hivemind) ){
                        Memory.cityPlanning[creep.room.name].roads.level ++; // ++
                        break; //cascade through if one task can't be completed
                    }
                }

            case "planCity":
                if( Memory.cityPlanning[creep.room.name].roads.level == 0 ){
                    if( planCity(creep, hivemind) ){
                        Memory.cityPlanning[creep.room.name].roads.level ++ ;
                        break; //cascade through if one task can't be completed
                    }
                }

            case "buildStuff":
                if( buildStuff(creep, (s)=>{return (s.structureType == STRUCTURE_EXTENSION)}) ){
                    break; //cascade through if one task can't be completed
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
                    break; //cascade through if one task can't be completed
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
        if(Game.time % configs.ticksBetweenRoomPlanningCheck == 0){
            creep.memory.task = "plan";
        }
    },




    defensive: function (creep, hivemind) {
    },



};

module.exports = plannerBehavior;