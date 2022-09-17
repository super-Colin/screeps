const configs = require("./main.config");

Creep.prototype.updateTask = function (newTask){
  this.memory.task.L_task = this.memory.task.name;
  this.memory.task.name = newTask;
}
Creep.prototype.updateTaskStatus = function (newStatus){
  this.memory.task.L_status = this.memory.task.status;
  this.memory.task.status = newStatus;
}
Creep.prototype.updateTargetId = function ( type, newId ){
  this.memory.targetId["L_"+ type] = this.memory.targetId[type];
  this.memory.targetId[type] = newId;
}

