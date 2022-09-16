const configs = require("./main.config");

function buildStuff(creep, constructionSitesFilter ='', useClosest = true){


    if( creep.memory.status != "building" || creep.memory.targetId == undefined ){
        creep.memory.task = "buildStuff"
        creep.say('🔨 Building Stuff');


        //Pick a target to build
        let buildSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(constructionSitesFilter != ''){
            buildSites = buildSites.filter(constructionSitesFilter);
            // return false if there's nothing after the filter
            if(buildSites.length == 0){
                creep.memory.status = "none";
                return false;
            }
        }

        let closestByPath = creep.pos.findClosestByPath(buildSites)
        // console.log("closest build is : ")
        // console.log(closestByPath)
        if(closestByPath == null){
            creep.memory.status = "none";
            return false;
        }

        if(useClosest || buildSites.length == 1){
            // console.log("setting creep targetId for building")
            // console.log(closestByPath.id)
            creep.memory.targetId = closestByPath.id;
        }else{
            let otherSites = buildSites.filter((b)=>{return (b.id != closestByPath.id)})
            if (otherSites.length > 0) {
                // pick a random source to use as target... I know it's bad..
                // console.log("setting creep targetId for building")
                creep.memory.targetId = otherSites[Math.floor(Math.random() * otherSites.length)].id;
            }else{
                creep.memory.status = "blocked";
                return false;
            }
        }



    }




    let creepTarget = Game.getObjectById(creep.memory.targetId);
    // console.log("[build] creepTarget is: ");
    // console.log(creepTarget);
    let workResult = creep.build(creepTarget);
    // console.log("[build] workResult is: ");
    // console.log(workResult);

    switch(workResult){
        case OK:
            creep.memory.status = "building";
            return true;
        case ERR_NOT_ENOUGH_RESOURCES:
            creep.memory.status = "empty";
            return false;
        case ERR_FULL:
            creep.memory.status = "blocked";
            return false;
        // try to move to it
        case ERR_NOT_IN_RANGE:
            let walkResult = creep.moveTo(creepTarget, {visualizePathStyle: {stroke: configs.colors.paths.energy}});
            if(walkResult == ERR_NO_PATH){
                creep.memory.status = "blocked";
                return false;
            }
            creep.memory.status = "building";
            return true;
    }

    console.log("Returning default FALSE in task: buildStuff");
    return false;
}


module.exports = buildStuff;
