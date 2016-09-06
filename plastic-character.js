function Character(name, nameElement, task, taskElement){
    this.name = name;
    this.nameElement = nameElement;
    this.task = task;
    this.taskElement = taskElement;
};

Character.prototype.printName = function(){
    for (var i = 0, length = this.nameElement.length; i < length; ++i) {
        this.nameElement[i].innerHTML = this.name;
    }
}

Character.prototype.printTask = function(){
    for (var i = 0, length = this.taskElement.length; i < length; ++i) {
        this.taskElement[i].innerHTML = this.task;
    }
}
