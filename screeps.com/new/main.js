const configs = require("./main.config");

const autoSpawn = require('./autoSpawn.main');
// import test from './test/test'

require('./creep.updateSelf');
const roleHarvester = require('./role.harvester.main');
const roleBuilder = require('./role.builder.main');
const roleDefender = require('./role.defender.main');
const rolePlanner = require('./role.planner.main');

const behaviors = {
  "harvester":roleHarvester.run,
  "builder":roleBuilder.run,
  "defender":roleDefender.run,
  "planner":rolePlanner.run,
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
    // test(creep);

    let role = Game.creeps[creep].memory.role;
    // create a new object in hivemind for each role
    hivemind[role] = hivemind[role] ? hivemind[role] : {};
    behaviors[role](Game.creeps[creep], hivemind);

  }

  // console.log('hivemind closing thoughts: ');
  // console.log(JSON.stringify(hivemind));

  // generate pixels with any remaining CPU
  if(Game.cpu.bucket >= 10000){
    if(Game.cpu.generatePixel() == OK){
      console.log("MADE A PIXEL WITH SPARE CPU! :)");
    };
  }else{
    // console.log('CPU bucket is: ' + Game.cpu.bucket);
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
// 🛡️ = Defend 
// 🏗️ = Planning 

// ✅ = Good
// 
// https://wiki.screepspl.us/index.php/Visuals_emoji