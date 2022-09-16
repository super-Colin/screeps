const configs = require("./main.config");

const planSourceRoads = require('./task.planSourceRoads');
const planCity = require('./task.planCity');
const healUnits = require('./task.healUnits');


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
            case "heal":
                if( healUnits(creep, hivemind) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    // if(creep.memory.status == "full"){
                    //     creep.memory.task = "storeEnergy";
                    // }else if(creep.memory.status == "blocked"){
                    //     creep.memory.task = "upgradeRoom";
                    // }
                }

            // reset task to default if not sure what happened
            default:
                creep.memory.task = "plan";
                // series of fallbacks
                // harvestEnergy() ? (storeEnergy() ? (upgradeRoom() ? : '') : '') : ''; // ???? nah, less readable.
                // if(! harvestEnergy(creep)){
                //     if(! storeEnergy(creep)){
                //         if(! upgradeRoom(creep)){
                //             // some fallback...
                //         }
                //     }
                // }
        }
    },




    defensive: function (creep, hivemind) {
    },



};

module.exports = plannerBehavior;