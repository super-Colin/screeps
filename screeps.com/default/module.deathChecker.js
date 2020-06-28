

// check for dead creeps and clear from memory to prevent memory leaks
for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
        console.log('deleted role was ' + creep[name].memory.role);
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
    }
}