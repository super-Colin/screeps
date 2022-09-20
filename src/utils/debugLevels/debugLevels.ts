import { configs } from "main.config";



export const dBug = function (debugCategory: DBG_CATEGORY, levelRequiredToLog: DBG_LEVEL = 9, msg: string = '', saveToLog: boolean = false): void{
  // Memory.debug.levels ??= configs.debugLevel;
  Memory.debug ??=  {
    "levels":{
      "SPAWN": 9,
      "TASK": 9,
      "ROLE": 9,
      "ACT": 9,
      "THINK": 9,
      "FEEL": 9,
      "DECIDE":9,
      "HIVEMIND": 9,
      "MEMORY": 9,
    },
    "log":[]
  }

  const runningAtLevel = Memory.debug.levels[debugCategory] ??= 2; // 1~10 for fallback init, higher means log more
  const logMsgOrNot = runningAtLevel >= levelRequiredToLog ? true : false;
  if (logMsgOrNot  == true ){
    console.log(": Debug msg from: '"+ debugCategory +"' :");
    console.log(msg);
  }
  if( saveToLog){
    Memory.debug.log.push(msg);
  } if (Memory.debug.log.length > Math.floor(10 * Memory.feelings.memoryUseModifier) ){
    Memory.debug.log.shift();
  }
}
