var roleRoadWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {


		// Roadstages [for each room]:
		// 1: New room; create construction sites
		// 2: Most construction sites have been created; prioritize building new roads
		// 3: Most roads have been fully constructed; prioritize repairing old roads
		if (Memory.roadStage[creep.room.name] == undefined) {
			Memory.roadStage[creep.room.name] = 1;
			console.log('set roadStage for room ' + creep.room.name + ' to ' + '1');
		}
		// switch (Memory.roadStage[creep.room.name]){
		// 	case '1': console.log('road construction phase 1');

		// 	case '2': console.log('road construction phase 2');

		// 	case '3': console.log('road construction phase 3');

		// 	default: console.log('roadWorker switch default case!!??!!?!1?!')
		// }


	}
};

module.exports = roleRoadWorker;