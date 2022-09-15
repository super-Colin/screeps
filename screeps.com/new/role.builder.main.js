

const behavior = require('./role.builder.behavior');


let roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        behavior.general(creep);
	}
};

module.exports = roleHarvester;