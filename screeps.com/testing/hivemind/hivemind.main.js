const configs = require("main.config");


// return how many creeps are focused on a given element
module.exports.hivemind = function (elemId, joining=false, leaving=false) {
    if( Memory.hivemind[elemId] == undefined ){
        if(joining){
            Memory.hivemind[elemId] = 1;
            return 1;
        }else{
            return 0;
        }
    }else if( Memory.hivemind[elemId] ){
        if(joining){
            Memory.hivemind[elemId] ++;
        }else if(leaving){
            Memory.hivemind[elemId] --;
            if(Memory.hivemind[elemId] == 0) {
                delete Memory.creeps[elemId];
            }
        }
        return Memory.hivemind[elemId];
    }
}
// Game.getObjectById 



module.exports = hivemind;