const configs = require("./main.config");

Creep.prototype.buildStuff = function ( opts = { constructionSitesFilter: '', useClosest: true}){

    const debgLvl = configs.debugLevel.task;
    const taskName = "buildStuff";
    const successStatusName = "building"; // for when already doing this task sucessfully to a target

    if( this.memory.lastStatus != successStatusName ){
        // check last task, if just tried to this task and got none or done, return false
        // if(this.memory.lastTask == taskName && this.memory.lastStatus == "done" || this.memory.lastStatus == "none"){
        if(this.memory.task.name == taskName && this.memory.lastStatus == "done" || this.memory.lastStatus == "none"){
            return false;
        }
        this.updateTask(taskName);
        this.say('🔨 Building Stuff');

        //Pick a target to build
        let buildSites = this.room.find(FIND_CONSTRUCTION_SITES);
        if(opts.constructionSitesFilter != ''){
            buildSites = buildSites.filter(constructionSitesFilter);
        }
        debgLvl > 9 ? console.log(this.name +" all CONSTRUCTION_SITES found to work on: ") :'';
        debgLvl > 9 ? console.log(buildSites) :'';

        // return false if there's nothing after the filter / saves us a potential search
        let closestByPath = false;
        if( buildSites.length > 0){
            // otherwise do a path find
            closestByPath = this.pos.findClosestByPath(buildSites)
            debgLvl > 8 ? console.log("closest build to "+ this.name +" is : (out of:"+buildSites.length+")") :'';
            debgLvl > 8 ? console.log(closestByPath) :'';
        }

        // if no result, then there is nothing to work on, return false
        if(closestByPath == null || closestByPath == false){
            debgLvl > 6 ? console.log(this.name +" couldn't find any construction sites to work on") :'';
            this.updateTaskStatus("none");
            this.updateTargetId( taskName, 0);
            return false;
        }

        if(useClosest || buildSites.length == 1){
            this.updateTargetId( taskName,closestByPath.id);
        }else{
            let otherSites = buildSites.filter((b)=>{return (b.id != closestByPath.id)})
            if (otherSites.length > 0) {
                // pick a random source to use as target... I know it's bad..
                this.updateTargetId( taskName, otherSites[Math.floor(Math.random() * otherSites.length)].id);
            }else{
                // still use closest as fallback
                this.updateTargetId( taskName, closestByPath.id);
            }
        }
    }


    let creepTarget = Game.getObjectById(this.memory.targetId.task);
    let workResult = this.build(creepTarget);
    debgLvl > 7 ? console.log(taskName +" result was:"+ workResult +" creepTarget is: ") :'';
    debgLvl > 8 ? console.log(creepTarget) :'';
    switch(workResult){
        case OK:
            this.updateTaskStatus("building");
            return true;
        case ERR_NOT_ENOUGH_RESOURCES:
            this.updateTaskStatus("empty");
            return false;
        case ERR_FULL:
            this.updateTaskStatus("blocked");
            return false;
        // try to move to it
        case ERR_NOT_IN_RANGE:
            let walkResult = this.moveTo(creepTarget, {visualizePathStyle: {stroke: configs.colors.paths.energy}});
            if(walkResult == ERR_NO_PATH){
                this.updateTaskStatus("blocked");
                return false;
            }
            this.updateTaskStatus(successStatusName);
            return true;
    }

    debgLvl > 4 ? console.log("Returning default FALSE in task: " + taskName) :'';
    return false;
}


// module.exports = buildStuff;
