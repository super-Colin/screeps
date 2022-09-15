const configs = require("./main.config");

const jobFiller = function (spawn, jobs) {

    // check we have as many of each role as we should
    for(let role in jobs){
        let inRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
        console.log( role+'s: ' + inRole.length + ' / ' + jobs[role]);
        // if there is less than the number of a role than specified in configs, make more
        if (inRole.length < jobs[role]) {
            console.log("need more: " + role + "s, adding 1 to spawn queue for spawn: " + spawn.name);
            spawn.memory.spawnQueue.push(role);
        }
    }
}

module.exports = jobFiller;

