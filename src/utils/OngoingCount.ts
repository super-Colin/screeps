


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