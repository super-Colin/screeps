
function build(creep){
    creep.memory.task = 'build';
    
    var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
    if(constructionSites.length) {
        
        let jobPosition = (creep.memory.roleNumber - 1) % 4;

        if(constructionSites[jobPosition] == undefined){
            jobPosition = 0;
        }
        
        if(creep.build(constructionSites[jobPosition]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionSites[jobPosition], {visualizePathStyle: {stroke: '#ffffff'}});
        }
        return true;
    } else {
        return false
    }

}


module.exports = build;
