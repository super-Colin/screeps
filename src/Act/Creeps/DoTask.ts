import { dBug } from "utils/debugLevels/debugLevels"



Creep.prototype.startTask = function (task: Task, thinkForSelf: boolean = true) {
  // init task memory
  if(this.memory.task == undefined){ 
    this.memory.task ={
      task: task.name,
      status: "starting",
      blocked: false,
      L_task: "none",
      L_status: "none",
    }
  }else{
    this.memory.task = {
      task: task.name,
      status: "starting",
      blocked: false,
      L_task: this.memory.task.task,
      L_status: this.memory.task.status,
    }
  }


  // think for itself or listen to a bigger plan
  if ( ! thinkForSelf ){
    dBug( "HIVEMIND", 6, this.name +" is listening to a bigger plan")
  }

  switch( task.name ){
    case "mine":
      STORAGE_HITS
      break;
    
    
  }


}



Creep.prototype.continueTask = function (task?: Task) {
  this.memory.task
}







