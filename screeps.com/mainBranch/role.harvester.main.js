

const behavior = require('./role.harvester.behavior');


let roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep, hivemind) {
        hivemind.harvesters = {};
        // console.log("hivemind is :");
        // console.log(JSON.stringify(hivemind));

        behavior.general(creep, hivemind);
	}
};

module.exports = roleHarvester;