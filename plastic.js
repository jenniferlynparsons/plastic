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

function Character(plastic, propList){
var defaults =

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

function mergeDefaults(obj, defaults, propList){
    Object.assign(obj, defaults);
    Object.assign(obj, propList);
}

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// inventory functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

function Inventory(propList){
    var defaults = {name: "Default Inventory", min: 0, max: Infinity};
    mergeDefaults(this, defaults, propList);
}

Inventory.prototype.printItems = function(plastic, items){
    for (var i = 0, length = this.itemListWrap.length; i < length; ++i) {
        this.itemListWrap[i].innerHTML = this.itemList;
    }
}

Inventory.prototype.addItem = function(plastic, newItem){
    console.log(this.itemList);
    console.log(newItem);
    console.log(typeof this.itemList);
     if(this.itemList.length < this.max){
        this.itemList.push(newItem);
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
