
import { ErrorMapper } from "utils/ErrorMapper";


// import profiler from 'screeps-profiler';
import { Mind } from "Mind";



// import { DecideLevelOfThoughtToUse } from 'Decide/LevelOfThought'


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {

  console.log(`~~ Tick: ${Game.time} ~~`);


  try {
    if (Date.now() - JSON.parse('__buildDate__') < 15000) {
      // Built less than 15 seconds ago - fresh code push
      console.log('New code successfully deployed, build time', new Date(JSON.parse('__buildDate__')));
    } else {
      console.log('Global reset detected');
    }
  } catch {
    // Ignore
  }



  const thus = new Mind();

  // thus.preTick();
  // let newActionPlan = thus.think();
  // thus.think();
  // thus.makeDecisions();
  // thus.runActions(newActionPlan);
  thus.runActions(thus.think());
  // thus.review();






  console.log(`~~ END Tick: ${Game.time} ~~`);


})




// Room.energyAvailable and Room.energyCapacityAvailable



// class MyThing {
//   public execute() {
//     console.log(`hi from tick ${Game.time}`);
//   }
// }

// console.log("reset! init instance...");
// const instance = new MyThing();
// console.log("ok.");

// export const loop = () => {
//   instance.execute();
// }

// // hi from tick 1
// // hi from tick 2
// // ...