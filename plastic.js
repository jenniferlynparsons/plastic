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

function  Inventory(name, ){
  this.name = name;
  this.min = min;
  this.max = max;
  this.autoRenew = renew;
  this.cat = category;
  this.subCat = subcategory;
}

Inventory.prototype.addItem = function(){
  this.itemList = [];
}


// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// interaction functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
