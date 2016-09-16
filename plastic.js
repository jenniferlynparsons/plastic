// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// UI functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

// TODO: make navigation between steps/progression more agnostic. right now, navigation must be links with class 'nextStep' as direct child of wrapper div for each step.

var current, next, anchors;

function navAnchors(anchorClass){
    anchors = document.getElementsByClassName(anchorClass);

    for(var i = 0, length = anchors.length; i < length; i++){

        anchors[i].addEventListener("click", function(e) {
            current = this.parentNode;
            current = current.matches('div') ? current : null;
            current.classList.add('hidden');

            next = this.getAttribute("href").replace(/[^a-zA-Z 0-9]+/g,"");
            next = document.getElementById(next);
            next.classList.remove('hidden');

            e.preventDefault();
        });
    }
}

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// form element functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

// TODO: could be handled with an array of elements?
function getInputVal(inputId){
    return inputId.value;
}

function checkRadio(radioName){
    for (var i = 0, length = radioName.length; i < length; i++) {
        if (radioName[i].checked) {
            return radioName[i].value;
        }
    }
}

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Character functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

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



// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// inventory functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

function Inventory(name, min, max, autoRenew, itemList, itemListWrap, updateSuccess, updateFail, removeSuccess, removeFail ){
    this.name = name;
    this.min = min;
    this.max = max;
    this.autoRenew = autoRenew;
    this.itemList = itemList;
    this.itemListWrap = itemListWrap;
    this.updateSuccess = updateSuccess;
    this.updateFail = updateFail;
    this.removeSuccess = removeSuccess;
    this.removeFail = removeFail;
}

Inventory.prototype.printItems = function(){
    for (var i = 0, length = this.itemListWrap.length; i < length; ++i) {
        this.itemListWrap[i].innerHTML = this.itemList;
    }
}

Inventory.prototype.addItem = function(newItem){
    console.log(this.itemList); //returns an array : Array [ "apples", "cinnamon", "crust" ]
    console.log(newItem); //returns a string with new item name
    console.log(typeof this.itemList); //returns typeof == object
     if(this.itemList.length < this.max){
        // console.log(typeof this.itemList);
        this.itemList = this.itemList.push(newItem);
        // console.log(typeof this.itemList);
        return this.updateSuccess;
    }else{
        return this.updateFail;
    }
}

Inventory.prototype.subtractItem = function(removeItem){
    var shorterArray;
    for(var i = 0, listLength = this.itemList.length; i <= listLength; i++){
        if(this.itemList[i] === removeItem){
            shorterArray = this.itemlist.splice(this.itemlist[i], 1);
        }
    }
    if(shorterArray.length > this.min){
        this.itemList = this.itemList.remove(removeItem);
        return this.removeSuccess;
    }else{
        return this.removeFail;
    }
}


// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// interaction functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
