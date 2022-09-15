const configs = require("./main.config");

const deathChecker = function () {
    // Check for memory leaks every so many ticks ticks
    if (Game.time % configs.ticksBetweenDeathCheck === 0) {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Cleared non-existing creep from memory: ', name);
            }
        }
    }
}

module.exports = deathChecker;