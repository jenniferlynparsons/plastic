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

function isAString(data){
  try{
    var namelength=data;
    if (!data.hasOwnProperty("length") || data.length == 0){
      // @todo NEW: i want this to pass in the name of the thing that's missing info
      throw new Error(data + " has some information missing or malformed")
    }
  }
  catch(e){
    console.log(e.message)
  }
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
  // @todo NEW this looks awful. and wrong.
  isAString(data.name);
  isAString(data.questType);
  isAString(data.state);
  this.name = data.name;
  this.type = data.questType;
  this.state = data.state;

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
  if(this.name){
    return this.name;
  }else{
    throw new Error("Something's wrong with the quest name");
  }
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
  if(this.state){
    return this.state;
  }else{
    throw new Error("Something's wrong with the state")
  }
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
  if(this.name){
    return this.name;
  }else{
    throw new Error("Something's wrong with the character name")
  }
}

// returns the Character role string
Character.prototype.getCharacterRole = function(){
  if(this.role){
    return this.role;
  }else{
    throw new Error("Something's wrong with the character role")
  }
}

// adds an inventory item to this Character's inventory
// HI CECELIA! when i have a breakpoint here, in the console file window it says: data = NewInventoryItem {}
// which looks like it's trying to read NewInventoryItem as a string plus an empty object.
// when the script finishes running as set up in plastic-demo-0.1.0.js i get this in the console: undefined [object Object]

Character.prototype.addInventoryItem = function(name, qty){
  // @todo this should also check if the item is already in the inventory and just add to the quantity if it is
  this.inventory.addItem(name, qty);
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
  var itemsArray = this.items;
  var allItems = "";
  for (var i = 0, length = this.items.length; i < length; ++i) {
    allItems += this.items[i] + ' '
  }
  // returning this instead of allItems shows this in console:
  // 0: InventoryItem
  //   name: Item
  //     name: "gold"
  //     value: 1

  return allItems;
}

// returns true if Item is in the Inventory
Inventory.prototype.findItem = function(name){
  return this.items.find(function(inventoryItem) {
    return inventoryItem.name == name;
  });
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
}

// adds the item to the inventory array
Inventory.prototype.addItem = function(name, qty){
  this.items.push(new InventoryItem(name,qty));
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

function InventoryItem(name, qty) {
  if(ItemDatabase[name] != ""){
    this.name = ItemDatabase[name];
    this.qty = qty;
  }else{
    throw new Error("This item does not exist and cannot be added.");
  }
}

// returns the value of the InventoryItem from the ItemDatabase
InventoryItem.prototype.getValue = function() {
  if(ItemDatabase[this.name].value){
    return ItemDatabase[this.name].value;
  }else{
    throw new Error("Something's wrong with the InventoryItem value");
  }
}

InventoryItem.prototype.getTotalValue = function() {
  if(ItemDatabase[this.name].value && this.qty){
    return ItemDatabase[this.name].value * this.qty;
  }
}

// removes an Item from the Inventory
function DestroyInventoryItem(name, qty) {
  if(ItemDatabase[name] != ""){
    this.name.pop();
  }else{
    throw new Error("This item does not exist and cannot be destroyed.");
  }
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


// There are items which exist free-floating in the items database. they can be added and deleted. they have various properties, but no quantities.

// There are inventory items which are items from the database, but here there is a quantity.

// There are inventories which house a number of inventory items.
