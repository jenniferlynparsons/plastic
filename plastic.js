

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Helpers

// #### ready
// This is a simple Document ready function to test if the DOM is fully loaded.
// It fires the function passed as a parameter if the DOM is ready, otherwise, it adds an event listener that will fire once the DOM finishes loading.
// SOURCE: http://youmightnotneedjquery.com/
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// #### loadJSON
// This is a local JSON file loading function for testing purposes
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

// This is the local JSON file loader call
var data;
function init(datasrc) {
  loadJSON(function(response) {
    // Parse JSON string into object
    data = JSON.parse(response);
  }, datasrc);
}

// #### propertyExists
// This checks if the property of length exists (string or array) for a basic check on data validity
function propertyExists(data, name){
  if (!data.hasOwnProperty(name) ||!data[name].hasOwnProperty("length") || data[name].length == 0){
    throw new Error(name + " has some information missing or malformed");
  }else {
    return true;
  }
}

// #### gotData
// This is an alternate simple data check
function gotData(data) {
  if(data !== undefined && data){
    return true;
  }else{
    console.log('There is no data.');
  }

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## General Game Data

// #### GameState
// The GameState creator currently is an empty object that accepts a data object parameter.
function GameState(data){};

// #### ItemDatabase
// The ItemDatabase is an empty object that holds the list of game item objects.
var ItemDatabase = {};

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Quest

// #### Quest
// The Quest creator function accepts a data object.
function Quest(data){
  if(propertyExists(data, "name") && propertyExists(data, "state") ){
    this.name = data.name;
    this.state = data.state;
  }
  if(data.questType){
    this.type = data.questType;
  }
  if (data.precondition){
    this.precondition = data.precondition;
  }else{
    this.precondition = function(){return true;}
  }
  if (data.postcondition){
    this.postcondition = data.postcondition;
  }else{
    this.postcondition = function(){return true;}
  }
  if (data.inventory){
    this.inventory = new Inventory(data.inventory);
  }else{
    this.inventory = new Inventory([]);
  }
}

 // #### changeState
// Updates the Quest state and availability
Quest.prototype.changeState = function(){
  if(this.isAvailable()){
    this.state = "active";
  }else if (this.isCompleteable()) {
    this.state = "closed";
  }
}

// #### isAvailable
// Returns true if the Quest is available to start otherwise returns false.
Quest.prototype.isAvailable = function(){
  return this.state == "open" && this.precondition();
}

// #### isActive
// returns true if the Quest is active otherwise returns false
Quest.prototype.isActive = function(){
  return this.state == "active";
}

// #### isCompleteable
// returns true if the Quest is complete otherwise returns false
Quest.prototype.isCompleteable = function(){
  return this.state == "active" && this.postcondition();
}

// #### isComplete
// returns true if the Quest is complete otherwise returns false
Quest.prototype.isComplete = function(){
  return this.state == "closed";
}

// #### getState
// returns the current Quest state string
Quest.prototype.getState = function(){
  if(this.state){
    return this.state;
  }else{
    throw new Error("Something's wrong with the " + this.name + " quest's state")
  }
}


// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Character

// #### Character
// The Character creator function accepts a data object.
function Character(data){
  if(propertyExists(data, "name")){
    this.name = data.name;
  }
  if(data.role){
    this.role = data.role;
  }
  if(data.level){
    this.level = data.level;
  }
  if (data.inventory){
    this.inventory = new Inventory(data.inventory);
  }else{
    this.inventory = new Inventory([]);
  }
}

/* TODO this will be required when character is allowed more than one inventory. character inventory will need to be refactored as an array of inventories. */

/* adds an Inventory to the Character if one does not already exist
 Character.prototype.addInventory = function(data){
   if (!this.inventory){
     this.inventory = data;
  }else{
     throw new Error("Inventory already exists");
   }
 }*/


// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Inventory

// #### Inventory
// Inventory creator function accepts a data object.
function Inventory(data) {
  /*  TODO check that data is array and not string or something else */
  this.items = data;
}

// #### getInventory
// returns the Inventory array
Inventory.prototype.getInventory = function() {
  return this.items;
}

// #### getItemByName
// returns the Item (truthy) if Item is in the Inventory
Inventory.prototype.getItemByName = function(queryItemName){
  for(var i=0, length=this.items.length; i < length; i++){
    if(this.items[i].item.name == queryItemName){
      return this.items[i];
    }
  }
}

// #### addItem
// adds the item to the inventory array
Inventory.prototype.addItem = function(name, qty){
  var newItem = this.getItemByName(name);
  if(newItem){
    if(qty != "" && qty != undefined){
      newItem.qty = newItem.qty + qty;
    }else{
      throw new Error("This item requires a quantity.");
    }
  }else{
    this.items.push(new InventoryItem(name,qty));
  }
}

// #### removeItem
// subtracts the requested quantity of the item from the inventory array, if the remaining quantity is equal to zero, it removes the item entirely. If the remaining quantity is less than zero, it returns a negeative number.
Inventory.prototype.removeItem = function(name, qty){
  var itemToRemove = this.getItemByName(name);
  if(itemToRemove){
    if(qty != "" && qty != undefined && (itemToRemove.qty - qty) > 0){
      itemToRemove.qty = itemToRemove.qty - qty;
    }else if(qty != "" && qty != undefined && (itemToRemove.qty - qty) == 0){
      var index = this.items.indexOf(itemToRemove);
      this.items.splice(index, 1);
    }else{
      if(qty == "" || qty == undefined){
        throw new Error("This item requires a valid quantity.");
      }else if ((itemToRemove.qty - qty) < 0) {
        return itemToRemove.qty - qty;
      }
    }
  }
}

/* TODO move this to inventory item prototype */
// #### getItemValue
// returns the value of the item from the ItemDatabase
Inventory.prototype.getItemValue = function(name) {
  var item = this.getItemByName(name);
  if(item){
    return ItemDatabase[name].value;
  }
}

/* TODO move this to inventory item prototype
TODO confusion here on how to get to it via InventoryItem because all items are ItemInventory and name is sibling of quantity, not parent. */

// #### getTotalItemValue
// returns the total value of the item in the Inventory
Inventory.prototype.getTotalItemValue = function(name) {
  var item = this.getItemByName(name);
  if(item){
    return ItemDatabase[name].value * item.qty;
  }
}

/* TODO move this to inventory item prototype */
// #### getTotalItemQty
// returns the total quantity of the InventoryItem in the Inventory
Inventory.prototype.getTotalItemQty = function(name) {
  var item = this.getItemByName(name);
  if(item){
    return item.qty;
  }
}

// #### InventoryItem
// creates a new Inventory Item
function InventoryItem(name, qty) {
  if(ItemDatabase[name] != "" && ItemDatabase[name] != undefined){
    this.item = ItemDatabase[name];
  }else{
    throw new Error("This item does not exist in the Item Database and cannot be added.");
  }
  if(qty != "" && qty != undefined){
    this.qty = qty;
  }else{
    throw new Error("This item requires a quantity.");
  }
}

// ## InventoryMediator
// This is a set of functions that can mediate trades and transfers between inventories.
var InventoryMediator = {};

// #### InventoryMediator.transferItem
// Transfers an item from the sender to the receiver
InventoryMediator.transferItem = function(sender, receiver, itemName, quantity) {
  sender.inventory.removeItem(itemName,quantity);
  receiver.inventory.addItem(itemName,quantity);
}

// #### InventoryMediator.performTrade
// Trades two items between two actors
InventoryMediator.performTrade = function(actor1, itemName1, quantity1, actor2, itemName2, quantity2) {
  actor1.inventory.addItem(itemName2,quantity2);
  actor2.inventory.addItem(itemName1,quantity1);
  actor1.inventory.removeItem(itemName1,quantity1);
  actor2.inventory.removeItem(itemName2,quantity2);
}

// #### InventoryMediator.getTradeDifference
// Gets the difference (postive/negative value or 0) left if items are traded between two
InventoryMediator.getTradeDifference = function(actor1, itemName1, quantity1, actor2, itemName2, quantity2) {
  var tradevalue1 = actor1.inventory.getItemValue(itemName1) * quantity1;
  var tradevalue2 = actor2.inventory.getItemValue(itemName2) * quantity2;
  return tradevalue1 - tradevalue2;
}

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Item

/* TODO should eventually be able to have multiple databases so the arrays stay effecient? */
// #### Item creator
// Item creator adds a new item to the ItemDatabase
function Item(name, val) {
  this.name = name;
  this.value = val;
  ItemDatabase[this.name] = this;
}

/*
Item.loadJson = function(filename) {
  var arr = // load json
  arr.forEach(function(item) {
    new Item(item.name, item.value);
  })
}
*/
