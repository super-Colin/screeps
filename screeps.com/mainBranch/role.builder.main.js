

const behavior = require('./role.builder.behavior');


let roleBuilder = {
    
    /** @param {Creep} creep **/
    run: function(creep, hivemind) {
        hivemind.builders = {};
        // console.log("hivemind is :");
        // console.log(JSON.stringify(hivemind));
        behavior.general(creep, hivemind);
	}
};

module.exports = roleBuilder;