import { dBug } from "./debugLevels/debugLevels";



export const startOngoingCount = function(tickUpdateFrequency: number, referenceNumber: number): ongoingCount{
  return {
    tickUpdateFrequency: tickUpdateFrequency,
    referenceValue: referenceNumber,
    runningAverage: 0,
    runningTotal: 0,
    lastUpdateTick: Game.time,
    nextUpdateTick: Game.time + tickUpdateFrequency
  }
}


export const updateOngoingCount = function (lastCount: ongoingCount, referenceNumber: number): ongoingCount{
  if (Game.time >= lastCount.nextUpdateTick){
    // update the runningAverage and reset the runningTotal
    let totalTicksPassed = Game.time - lastCount.lastUpdateTick;
    return{
      tickUpdateFrequency: lastCount.tickUpdateFrequency,
      referenceValue: referenceNumber,
      runningAverage: Math.floor(lastCount.runningTotal / totalTicksPassed),
      runningTotal: 0,
      lastUpdateTick: Game.time,
      nextUpdateTick: Game.time + lastCount.tickUpdateFrequency
    }
  } else { // if not a runningAverage update, update the count
    let changedBy = referenceNumber - lastCount.referenceValue;
    return {
      tickUpdateFrequency: lastCount.tickUpdateFrequency,
      referenceValue: referenceNumber,
      runningAverage: lastCount.runningAverage,
      runningTotal: Math.floor(lastCount.runningTotal + changedBy),
      lastUpdateTick: lastCount.lastUpdateTick,
      nextUpdateTick: lastCount.nextUpdateTick
    }
  }
}





// export const updateLiveCount = function (lastCount: ongoingCount, referenceNumber: number, changedBy:number): ongoingCount {
// }



// interface runningAverage {
//   beforeReset: number;
//   runningAverage: number; // updated every tickFrequency
//   runningTotalAmount: number; // increases each time the update is called, reset every tickFrequency
//   runningTotalTicks: number; // increases each time the update is called, reset every tickFrequency

//   nextResetTick: number, // the tick runningAverage will be updated next
//   tickResetFrequency: number; // how many ticks between average updates
//   timeoutOnTick?: number;
// }



export const newRunningAverage = function (resetFrequency: number = 20, timeoutInTicks: number = 0): runningAverage {
  let newAverage: runningAverage = {
    beforeReset: 0,
    runningAverage: 0,
    runningTotalAmount: 0,
    runningTotalTicks: 0,

    tickResetFrequency: resetFrequency,
    nextResetTick: Game.time + resetFrequency,
  }
  if(timeoutInTicks > 0 ){
    newAverage.timeoutOnTick= Game.time + timeoutInTicks
  }
  return newAverage;
}



export const addDepositToRoomLogistics = function (roomName:string, amount:number){
  let room = Game.rooms[roomName];
  if (room == undefined ){
    dBug("SPAWN", 2, "addDepositToRoomLogistics was passed a bad room name "+ roomName)
    return
  }
  if (room.memory.logistics == undefined ){
    dBug("SPAWN", 2, "addDepositToRoomLogistics was passed a bad room name " + roomName)
    return
  }

  room.memory.logistics.calculations.energyIncome.runningTotalAmount += amount;
}
