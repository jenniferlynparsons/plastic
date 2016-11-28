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
  // use try catch, length will check for strings, or hasownproperty (doesn't need try catch)
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
  // @todo check preconditions
  if(this.state == "open"){ //this.isAvailable()
    this.state = "active";
  }else if (this.state == "active") { //make function this.isComplete()
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
    this.inventory = new Inventory(data.inventory);
  }else{
    this.inventory = new Inventory([]);
  }
}

// returns the Character name string
Character.prototype.getCharacter = function(){
  return this.name;
}

// returns the Character role string
Character.prototype.getCharacterRole = function(){
  return this.role;
}

// adds an inventory item to this Character's inventory
Character.prototype.addInventoryItem = function(data){
  this.inventory.addItem(data);
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

// abstraction layer for InventoryMediator
Character.prototype.tradeInventory = function(tradee, givenItem, receivedItem){
  inventoryMediator(this, tradee, givenItem, receivedItem);
}

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Inventory

// Inventory creator
function Inventory(data) {
  this.items = data;
}

// returns the Inventory array
Inventory.prototype.getInventory = function() {
  //@todo
  // var itemsArray = Array.prototype.slice.call(this.items);
  // var allItems;
  // for (var i = 0, length = this.items.length; i < length; ++i) {
  //   allItems += ' ' + this.items[i] + ' '
  // }
  return this.inventory;
}

// returns true if Item is in the Inventory
Inventory.prototype.findItem = function(name){
  return this.items.find(function(inventoryItem) {
    return inventoryItem.name == name;
  });
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
}

Inventory.prototype.addItem = function(item){
  this.items.push(item);
}


function inventoryMediator(trader, tradee, given, received){
  var addItem = function(item, qty){
    NewInventoryItem(item, qty);
  }
  var removeItem = function(item){
    DestroyInventoryItem(item, qty);
  }
  // if the given item is the same value as the gotten item, then move from one inventory to the other
  if(trader.inventory.findItem(given.name) == true && tradee.inventory.findItem(received.name) == true){
      if(given.qty == received.qty){
        trader.inventory.removeItem(given, given.qty);
        trader.inventory.addItem(received, received.qty);
        tradee.inventory.removeItem(received, received.qty);
        tradee.inventory.addItem(given, given.qty);
      }
  }
}


// adds an Item to the Inventory
function NewInventoryItem(name, qty) {
  if(ItemDatabase[name] != ""){
    this.name = name;
    this.qty = qty;
  }else{
    throw new Error("This item does not exist and cannot be added.");
  }
}

// adds an Item to the Inventory
function DestoryInventoryItem(name, qty) {
  if(ItemDatabase[name] != ""){
    this.name.pop();
  }else{
    throw new Error("This item does not exist and cannot be destroyed.");
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
