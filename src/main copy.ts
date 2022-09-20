// import { ErrorMapper } from "utils/ErrorMapper";

// declare global {
//   /*
//     Example types, expand on these or remove them and add your own.
//     Note: Values, properties defined here do no fully *exist* by this type definiton alone.
//           You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

//     Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
//     Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
//   */
//   // Memory extension samples
//   interface Memory {
//     uuid: number;
//     log: any;
//   }

//   // interface CreepMemory {
//   //   role: string;
//   //   room: string;
//   //   working: boolean;
//   // }

//   // Syntax for adding proprties to `global` (ex "global.log")
//   namespace NodeJS {
//     interface Global {
//       log: any;
//     }
//   }
// }

// // When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// // This utility uses source maps to get the line numbers and file names of the original, TS source code
// export const loop = ErrorMapper.wrapLoop(() => {
//   console.log(`Current game tick is ${Game.time}`);



//   // // Feel
//   // let isFeeling = ()=>{}
//   // let feelings = isFeeling()

//   // // Think



//   // //Decide
//   // // DecideLevelOfThoughtToUse(feelings);


//   // //Act






//   // Automatically delete memory of missing creeps
//   for (const name in Memory.creeps) {
//     if (!(name in Game.creeps)) {
//       delete Memory.creeps[name];
//     }
//   }
// });





















// // // import 'ts-polyfill/lib/es2019-array';
// // // import './utils/RoomVisual';

// // // import { Boardroom } from 'Boardroom/Boardroom';
// // // import MemHack from 'utils/memhack';
// // // import { VisualizationController } from 'utils/VisualizationController';
// // // import { clearNudges } from 'utils/excuseMe';
// // // import { onRespawn } from 'utils/ResetMemoryOnRespawn';
// // // import profiler from 'screeps-profiler';
// // // import { run as runReports } from 'Reports/ReportRunner';

// // try {
// //   if (Date.now() - JSON.parse('__buildDate__') < 15000) {
// //     // Built less than 15 seconds ago - fresh code push
// //     console.log('New code successfully deployed, build time', new Date(JSON.parse('__buildDate__')));
// //   } else {
// //     console.log('Global reset detected');
// //   }
// // } catch {
// //   // Ignore
// // }


// // global.lastGlobalReset = Game.time;


