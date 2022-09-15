const configs = require("./main.config");

const harvestEnergy = require('./task.harvestEnergy');
const storeEnergy = require('./task.storeEnergy');
const upgradeRoom = require('./task.upgradeRoom');
const withdrawEnergy = require('./task.withdrawEnergy');

// const repairWallsRoads = require('maintainer.bodyParts');

let maintainerBehavior = {

    /** @param {Creep} creep **/
    general: function (creep) {

        // init creep task memory, start by harvesting some energy
        if( creep.memory.task == undefined){
            creep.memory.task = "harvestEnergy";
            creep.memory.status = "harvesting";
            creep.say('🌀 harvesting');
        }


        switch(creep.memory.task){
            case "withdrawEnergy":
                if( withdrawEnergy(creep) ){
                    break; 
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "full"){
                        creep.memory.task = "upgradeRoom";
                    }
                }
            case "harvestEnergy":
                if( harvestEnergy(creep) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "full"){
                        creep.memory.task = "upgradeRoom";
                    }
                }
            case "storeEnergy":
                if( storeEnergy(creep) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "blocked" || creep.memory.status == "empty"){
                        creep.memory.task = "upgradeRoom";
                    }
                }
            case "upgradeRoom":
                if( upgradeRoom(creep) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "blocked" || creep.memory.status == "empty"){
                        creep.memory.task = "harvestEnergy";
                    }
                }
            default:
                if(! harvestEnergy(creep)){
                    if(! storeEnergy(creep)){
                        if(! upgradeRoom(creep)){
                            // some fallback...
                        }
                    }
                }
                break;
        }
    },




    defensive: function (creep) {
    },



};

module.exports = maintainerBehavior;