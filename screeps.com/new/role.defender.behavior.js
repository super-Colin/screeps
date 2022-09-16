const configs = require("./main.config");

const defendRoom = require('./task.defendRoom');


let defenderBehavior = {

    /** @param {Creep} creep **/
    general: function (creep, hivemind) {
        // init creep task memory, start by harvesting some energy
        if( creep.memory.task == undefined){
            creep.memory.task = "defendRoom";
            creep.say('🔆 Hello!');
        }

        switch(creep.memory.task){


            // case "defendRoom":
            //     if( defendRoom(creep) ){
            //         break; //cascade through if one task can't be completed
            //     }else{
            //         if(creep.memory.status == "none"){
            //             creep.memory.task = "defendRoom";
            //         }else if(creep.memory.status == "blocked"){
            //             creep.memory.task = "defendRoom";
            //         }
            //     }


            default:
                defendRoom(creep);
        }
    },



    defensive: function (creep, hivemind) {
    },



};

module.exports = defenderBehavior;