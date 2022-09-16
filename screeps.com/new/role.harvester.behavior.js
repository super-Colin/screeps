const configs = require("./main.config");

const harvestEnergy = require('./task.harvestEnergy');
const storeEnergy = require('./task.storeEnergy');
const upgradeRoom = require('./task.upgradeRoom');

let harvesterBehavior = {

    /** @param {Creep} creep **/
    general: function (creep, hivemind) {
        // init creep task memory, start by harvesting some energy
        if( creep.memory.task == undefined){
            creep.memory.task = "harvestEnergy";
            creep.say('🔆 Hello!');
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




    defensive: function (creep, hivemind) {
    },



};

module.exports = harvesterBehavior;