const configs = require("./main.config");

const withdrawEnergy = require('./task.withdrawEnergy');
const buildStuff = require('./task.buildStuff');


const pickupEnergy = require('./task.pickupEnergy');
const harvestEnergy = require('./task.harvestEnergy');
const storeEnergy = require('./task.storeEnergy');
const upgradeRoom = require('./task.upgradeRoom');

// const repairWallsRoads = require('./task.repairWallsRoads');
// const repairWallsRoads = require('builder.bodyParts');

let builderBehavior = {

    /** @param {Creep} creep **/
    general: function (creep, hivemind) {
        // init creep task memory, start by harvesting some energy
        if( creep.memory.task == undefined){
            creep.memory.task = "pickupEnergy";
            creep.say('🔆 Hello!');
        }

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

            // This will be a lower priority in more defensive behavior trees
            case "pickupEnergy":
                if( pickupEnergy(creep) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "full"){
                        creep.memory.task = "buildStuff";
                    }else if(creep.memory.status == "blocked" || creep.memory.status == "none"){
                        creep.memory.task = "withdrawEnergy";
                    }
                }

            case "withdrawEnergy":
                if( withdrawEnergy(creep) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "full"){
                        creep.memory.task = "buildStuff";
                    }else if(creep.memory.status == "blocked" || creep.memory.status == "none"){
                        creep.memory.task = "harvestEnergy";
                    }
                }

            case "harvestEnergy":
                if( harvestEnergy(creep) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "full"){
                        creep.memory.task = "buildStuff";
                    }else if(creep.memory.status == "blocked" || creep.memory.status == "none"){
                        creep.memory.task = "pickupEnergy";
                    }
                }

            case "buildStuff":
                if( buildStuff(creep) ){
                    break; //cascade through if one task can't be completed
                }else{// if we can't harvest energy, try to...
                    if(creep.memory.status == "empty"){
                        creep.memory.task = "withdrawEnergy";
                    }else if(creep.memory.status == "blocked"){
                        creep.memory.task = "upgradeRoom";
                    }else if(creep.memory.status == "none"){
                        creep.memory.task = "upgradeRoom";
                    }
                }



                

            //     // repair
            // case "repairStuff":
            //     if( repairStuff(creep) ){
            //         break; //cascade through if one task can't be completed
            //     }else{// if we can't harvest energy, try to...
            //         if(creep.memory.status == "empty"){
            //             creep.memory.task = "withdrawEnergy";
            //         }else if(creep.memory.status == "blocked"){
            //             creep.memory.task = "upgradeRoom";
            //         }
            //     }



            default:
                // series of fallbacks
                // harvestEnergy() ? (storeEnergy() ? (upgradeRoom() ? : '') : '') : ''; // ???? nah, less readable.
                if(! pickupEnergy(creep)){
                    if(! withdrawEnergy(creep)){
                        if(! harvestEnergy(creep)){
                            if(! buildStuff(creep)){
                                // some fallback...
                            }
                        }
                    }
                }
        }
    },



    defensive: function (creep, hivemind) {
    },



};

module.exports = builderBehavior;