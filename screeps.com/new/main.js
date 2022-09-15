const configs = require("./main.config");

const autoSpawn = require('./autoSpawn.main');

const roleHarvester = require('./role.harvester.main');
const roleBuilder = require('./role.builder.main');


const behaviors = {
  "harvester":roleHarvester.run,
  "builder":roleBuilder.run
}



module.exports.loop = function () {
  // if(autoSpawn){
  //   console.log(autoSpawn);
  // }

  // AUTO SPAWNING FOR EACH SPAWN
  for(let spawn in Game.spawns){
    // console.log(Game.spawns[spawn])
    autoSpawn(Game.spawns[spawn]);
  }


  // Give creeps things to do
  for(let creep in Game.creeps){

    let role = Game.creeps[creep].memory.role;
    behaviors[role](Game.creeps[creep]);

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

// ✅ = Good
// 
