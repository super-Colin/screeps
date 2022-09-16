const configs = require("./main.config");

const autoSpawn = require('./autoSpawn.main');

const roleHarvester = require('./role.harvester.main');
const roleBuilder = require('./role.builder.main');
const roleDefender = require('./role.defender.main');


const behaviors = {
  "harvester":roleHarvester.run,
  "builder":roleBuilder.run,
  "defender":roleDefender.run,
}

// hivemind is an object that will be passed between creeps and spawns
// it will be how things update each other in the same tick
let hivemind = {};



module.exports.loop = function () {
  // if(autoSpawn){
  //   console.log(autoSpawn);
  // }

  // AUTO SPAWNING FOR EACH SPAWN
  for(let spawn in Game.spawns){
    // console.log(Game.spawns[spawn])
    autoSpawn(Game.spawns[spawn], hivemind);
  }


  // Give creeps things to do
  for(let creep in Game.creeps){

    let role = Game.creeps[creep].memory.role;
    behaviors[role](Game.creeps[creep], hivemind);

  }


}



// Emojis
// ❌  ✔️  
// 🔴 🟠 🟡 🟢 🔵 🟣 ⚫️ ⚪️
//  ⚙️  💥  🔅  🔆  🥓  🍰  🎂  🏎  🏍  ⚓️  💡  🔒  📈  📉  💢  ❗️  ❓  🌀  🎵  💲

// 🔨 = Build
// 🔧 = Repair
// ⚡️ = Upgrade
// 💰 = Store 
// ⚔️ = Combat 

// ✅ = Good
// 
