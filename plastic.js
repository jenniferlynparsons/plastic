// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Helpers


// http://youmightnotneedjquery.com/
// simple Document ready function
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// local JSON file loading function
// https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadJSON(callback, datasrc) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', datasrc, false); // Replace 'my_data' with the path to your file, change false to true for asynchronous loading
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

// local JSON file loader call
var data;
function init(datasrc) {
 loadJSON(function(response) {
  // Parse JSON string into object
    data = JSON.parse(response);
 }, datasrc);
}


// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// GameState

// GameState creator
function GameState(data){

}

// holds the list of game items
var ItemDatabase = {};

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Quest

// Quest creator
function Quest(data){
  // @todo should the name, type, etc. for each function throw an error if it doesn't exist?
  if(data.name.length && data.questType.length && data.state.length){
    this.name = data.name;
    this.type = data.questType;
    this.state = data.state;
  }else{
    throw new Error("There is some data missing");
  }
  if (data.precondition){
    this.precondition = data.precondition;
  }else{
    this.precondition = function(){return true;}
  }
  // if (data.inventory){
  //   this.inventory = new Inventory();
  // }
}

// returns the requested Quest name string
Quest.prototype.getQuest = function(){
  return this.name;
}

// sets the Quest state/availability
Quest.prototype.changeState = function(){
  if(this.state == "open"){
    this.state = "active";
  }else if (this.state == "active") {
    this.state = "closed";
  }else{
    throw new Error("Quest is closed");
  }
}

// returns true if the Quest is available
Quest.prototype.isAvailable = function(){
  return this.state == "open" && this.precondition();
}

Quest.prototype.getState = function(){
  return this.state;
}


// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Character

// Character creator
function Character(data){
  this.name = data.name;
  this.role = data.role;
  this.level = data.level;
  if (data.inventory){
    console.log("this");
    this.inventory = data.inventory;
  }else{
    console.log("that");
    this.inventory = new Inventory([]);
  }
  console.log("inventorychar: " + this.inventory);
}

// returns the Character name string
Character.prototype.getCharacter = function(){
  return this.name;
}

// returns the Character role string
Character.prototype.getCharacterRole = function(){
  return this.role;
}

Character.prototype.inventoryItem = function(data){
  console.log("inventoryItem: " + this.inventory);
  // doesn't currently push the data to the inventory
  this.inventory.push(data);
}

// adds an Inventory to the Character if one does not already exist
// Character.prototype.addInventory = function(data){
//   if (!this.inventory){
//     this.inventory = data;
//   }else{
//     throw new Error("Inventory already exists");
//   }
// }

// returns the Character Inventory array
Character.prototype.getInventory = function(){
  return this.inventory.getInventory();
}

Character.prototype.tradeInventory = function(trader, givenItem, tradee, receivedItem){
  // if the given item is the same value as the gotten item, then move from one inventory to the other
    if(trader.inventory.findItem(givenItem.name) == true && tradee.inventory.findItem(receivedItem.name) == true){
        if((givenItem.value * givenItem.qty) == (receivedItem.value * receivedItem.qty)){
          trader.inventory.removeItem(givenItem);
          trader.inventory.addItem(receivedItem);
          tradee.inventory.removeItem(givenItem);
          tradee.inventory.addItem(receivedItem);
        }
    }
}

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Inventory

// Inventory creator
function Inventory(data) {
  this.items = data;
  console.log("inventory: " + this.items[0]);

}

// returns the Inventory array
Inventory.prototype.getInventory = function() {
  //@todo
  // var itemsArray = Array.prototype.slice.call(this.items);
  var allItems;
  for (var i = 0, length = this.items.length; i < length; ++i) {
    allItems += ' ' + this.items[i] + ' '
  }
  return allItems;
}

// returns true if Item is in the Inventory
Inventory.prototype.findItem = function(name){
  return this.items.find(function(inventoryItem) {
    return inventoryItem.name == name;
  });
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
}

// @todo is this InventoryMediator stuff still required?

// function InventoryMediator(){
//
// }
// InventoryMediator.prototype.add = function(){
//
// }
// InventoryMediator.prototype.remove = function(){
//
// }

// adds an Item to the Inventory
function InventoryItem(name, qty) {
  if(ItemDatabase[name] != ""){
    this.name = name;
    this.qty = qty;
  }else{
    throw new Error("This item does not exist and cannot be added.");
  }
}

// returns the value of the InventoryItem from the ItemDatabase
InventoryItem.prototype.getValue = function() {
  return ItemDatabase[this.name].value * this.qty;
}

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Item

// Item creator
function Item(name, val) {
  this.name = name;
  this.value = val;
  // adds this item to the ItemDatabase
  ItemDatabase[this.name] = this;
}

// Item.loadJson = function(filename) {
//   // var arr = // load json
//   // arr.forEach(function(item) {
//   //   new Item(item.name, item.value);
//   // })
// }



//
// function InteractionMediator(sender, receiver, quantity){
//
// }
