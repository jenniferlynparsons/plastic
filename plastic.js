// https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadJSON(callback, datasrc) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', datasrc, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

var data;

function init(datasrc) {
 loadJSON(function(response) {
  // Parse JSON string into object
    data = JSON.parse(response);
 }, datasrc);
}

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

function GameState(data){

}

function Quest(data){
  this.name = data.name;
}
Quest.prototype.getQuest = function(){
  console.log("quest " + this.name);
  return this.name;
}

function Character(data){
  this.name = data.name;
  this.role = data.role;
  this.level = data.level;
  this.inventory = data.inventory;
}
Character.prototype.getCharacter = function(){
  console.log("character:" + this.name + " role:" + this.role + " level:" + this.level);
  return this.name;
}
Character.prototype.printCharacterName = function(){
  return this.name;
}
Character.prototype.printCharacterRole = function(){
  return this.role;
}

function Inventory(data) {
  this.name = data.name;
  this.items = data.items;
}
Inventory.prototype.getInventory = function() {
  var itemsArray = Array.prototype.slice.call(this.items);
  var allItems;
  for (var i = 0, length = this.items.length; i < length; ++i) {
    allItems += ' ' + itemsArray[i] + ' '
  }
  console.log("inventory " + allItems);
  return allItems;
}

function InventoryMediator(){

}

InventoryMediator.prototype.add = function(){

}
InventoryMediator.prototype.remove = function(){

}
