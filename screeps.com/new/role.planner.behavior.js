const configs = require("./main.config");

const planCity = require('./task.planCity');
const healUnits = require('./task.healUnits');

// const repairWallsRoads = require('./task.repairWallsRoads');
// const repairWallsRoads = require('harvester.bodyParts');

let plannerBehavior = {

    /** @param {Creep} creep **/
    general: function (creep, hivemind) {
        // init creep task memory
        if( creep.memory.task == undefined){
            creep.memory.task = "planCity";
            creep.say('🔆 Hello!');
        }
        hivemind[creep.memory.role][creep.id] = {};

        switch(creep.memory.task){
            case "planCity":
                if( planCity(creep, hivemind) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    // if(creep.memory.status == "full"){
                    //     creep.memory.task = "storeEnergy";
                    // }else if(creep.memory.status == "blocked"){
                    //     creep.memory.task = "upgradeRoom";
                    // }
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

            default:
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