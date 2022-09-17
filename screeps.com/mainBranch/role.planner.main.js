

const behavior = require('./role.planner.behavior');


let rolePlanner = {
    
    /** @param {Creep} creep **/
    run: function(creep, hivemind) {

        behavior.general(creep, hivemind);

        // if(hivemind.war == true){
        //     behavior.defensive(creep, hivemind);
        // }
	}
};

module.exports = rolePlanner;