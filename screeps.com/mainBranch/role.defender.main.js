

const behavior = require('./role.defender.behavior');


let roleDefender = {
    
    /** @param {Creep} creep **/
    run: function(creep, hivemind) {
        hivemind.defenders = {};
        // console.log("hivemind is :");
        // console.log(JSON.stringify(hivemind));
        behavior.general(creep, hivemind);
	}
};

module.exports = roleDefender;