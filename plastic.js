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

// checks if the property of length exists (string or array) for a basic check on data validity
function propertyExists(data, name){
  if (!data.hasOwnProperty(name) ||!data[name].hasOwnProperty("length") || data[name].length == 0){
    throw new Error(name + " has some information missing or malformed")
  }else {
    return true;
  }
}

// alternate simple data check
function gotData(data) { if (data !== undefined && data) return true; else console.log('There is no data.') }

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// GameState

// GameState creator
function GameState(data){};

// ItemDatabase holds the list of game items
var ItemDatabase = {};

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Quest

// Quest creator
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
    this.postcondition = function(){return false;}
  }
  if (data.inventory){
    this.inventory = new Inventory(data.inventory);
  }else{
    this.inventory = new Inventory([]);
  }
}

// returns the Quest name string
Quest.prototype.getQuestName = function(){
  return this.name;
}

// returns the Quest type string
Quest.prototype.getQuestType = function(){
  return this.type;
}

// updates the Quest state and availability
Quest.prototype.changeState = function(){
  if(this.state == "open" && this.precondition()){
    this.state = "active";
  }else if (this.state == "active" && this.postcondition()) {
    this.state = "closed";
  }
}

// returns true if the Quest is available to start otherwise returns false
Quest.prototype.isAvailable = function(){
  return this.state == "open" && this.precondition();
}

// returns true if the Quest is active otherwise returns false
Quest.prototype.isActive = function(){
  return this.state == "active";
}

// returns true if the Quest is complete otherwise returns false
Quest.prototype.isComplete = function(){
  return this.state == "closed" && this.postcondition();
}

// returns the current Quest state string
Quest.prototype.getState = function(){
  if(this.state){
    return this.state;
  }else{
    throw new Error("Something's wrong with the " + this.name + " quest's state")
  }
}


// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Character

// Character creator
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

// returns the Character name string
Character.prototype.getCharName = function(){
  return this.name;
}

// returns the Character role string
Character.prototype.getCharRole = function(){
  if(this.role){
    return this.role;
  }else{
    throw new Error("Something's wrong with " + this.name + "'s role")
  }
}

// returns the Character level string
Character.prototype.getCharLevel = function(){
  if(this.level){
    return this.level;
  }else{
    throw new Error("Something's wrong with " + this.name + "'s level")
  }
}

// TODO this will be required when character is allowed more than one inventory. character inventory will need to be refactored as an array of inventories.

// adds an Inventory to the Character if one does not already exist
// Character.prototype.addInventory = function(data){
//   if (!this.inventory){
//     this.inventory = data;
//   }else{
//     throw new Error("Inventory already exists");
//   }
// }


// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Inventory

// Inventory creator
function Inventory(data) {
  this.items = data;
}

// returns the Inventory array
Inventory.prototype.getInventory = function() {
  return this.items;
}

// returns true if Item is in the Inventory
Inventory.prototype.inInventory = function(queryItem){
  var count = 0;
  this.items.forEach(function(inventoryItem) {
    if(inventoryItem.item.name == queryItem){
      count = 1;
    }
  });
  if(count === 1){
    return true;
  }else{
    return false;
  }
}

// adds the item to the inventory array
Inventory.prototype.addItem = function(name, qty){
  if(this.inInventory(name)){
    this.items.forEach(function(inventoryItem) {
      if(inventoryItem.item.name == name){
        if(qty != "" && qty != undefined){
          inventoryItem.qty = inventoryItem.qty + qty;
        }else{
          throw new Error("This item requires a quantity.");
        }
      }
    });
  }else{
    this.items.push(new InventoryItem(name,qty));
  }
}

// TODO this likely needs a fancier refactoring, but it works so yay!
// adds the item to the inventory array
Inventory.prototype.removeItem = function(name, qty){
  if(this.inInventory(name)){
    var remove = false;
    var itemToRemove;
    for(var i=0, length=this.items.length; i < length; i++){
      var inventoryItem = this.items[i];
      if(inventoryItem.item.name == name){
        console.log(inventoryItem.item.name);
        if(qty != "" && qty != undefined && (inventoryItem.qty - qty) > 0){
          inventoryItem.qty = inventoryItem.qty - qty;
        }else if(qty != "" && qty != undefined && (inventoryItem.qty - qty) == 0){
          remove = true;
          itemToRemove = inventoryItem;
        }else{
          if(qty == "" || qty == undefined){
            throw new Error("This item requires a valid quantity.");
          }else if ((inventoryItem.qty - qty) < 0) {
            throw new Error("There is not enough of this item.");
          }
        }
      }
    };
    if(remove == true && itemToRemove.item.name == name){
      var index = this.items.indexOf(itemToRemove);
      console.log(index);
      if(index != -1) {
        this.items.splice(index, 1);
        console.log(this.items);
      }
    }
  }
}

// returns the basic value of the InventoryItem from the ItemDatabase
Inventory.prototype.getItemValue = function(name) {
  if(this.inInventory(name)){
    var itemValue = 0;
    this.items.forEach(function(inventoryItem) {
      if(inventoryItem.item.name == name){
        itemValue = ItemDatabase[name].value;
      }
    });
    return itemValue;
  }else{
    throw new Error("Something's wrong with the Item value.");
  }
}

// returns the total value of the InventoryItem in the Inventory
Inventory.prototype.getTotalItemValue = function(name) {
  if(this.inInventory(name)){
    var itemTotalValue = 0;
    this.items.forEach(function(inventoryItem) {
      if(inventoryItem.item.name == name){
        itemTotalValue = ItemDatabase[name].value * inventoryItem.qty;
      }
    });
    return itemTotalValue;
  }else{
    // TODO in subsequent versions, this probably shouldn't halt everything but should trigger a different response. (Sorry, you don't have enough gold!) maybe a function like the precondition/postcondition for quests.
    throw new Error("Something's wrong with the Item total value or this item may not exist in the inventory.");
  }
}

// returns the total quantity of the InventoryItem in the Inventory
Inventory.prototype.getTotalItemQty = function(name) {
  if(this.inInventory(name)){
    var itemTotalQty = 0;
    this.items.forEach(function(inventoryItem) {
      if(inventoryItem.item.name == name){
        itemTotalValue = inventoryItem.qty;
      }
    });
    return itemTotalQty;
  }else{
    // TODO in subsequent versions, this probably shouldn't halt everything but should trigger a different response. (Sorry, you don't have enough gold!) maybe a function like the precondition/postcondition for quests.
    throw new Error("Something's wrong with the Item total value or this item may not exist in the inventory.");
  }
}

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

// TODO make this work!
function inventoryMediator(actor1, item1, qty1, actor2, item2, qty2){
  // // if the given item is the same value as the gotten item, then move from one inventory to the other
  if(actor1.inventory.inInventory(item1) && actor2.inventory.inInventory(item2)){
    // TODO need a "this is an even trade" check. maybe a function that returns true/false?
    // if(item1.getItemValue(item1) * (item1.getTotalItemQty(item1) - qty1) == item2.getItemValue(item2) * (item2.getTotalItemQty(item2) - qty2)){
      // give item1 to actor2
      actor2.inventory.addItem(item1,qty1);
      // give item2 to actor1
      actor1.inventory.addItem(item2,qty1);
      // remove item1 from actor1
      actor1.inventory.removeItem(item1,qty1);
      // remove item2 from actor2
      actor2.inventory.removeItem(item2,qty2);
      console.log(actor1.inventory);
      console.log(actor2.inventory);
    // }else{
    //   console.log("a trade cannot occur");
    // }
  }
}


// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Item

// Item creator adds this item to the ItemDatabase
// TODO should eventually be able to have multiple databases so the arrays stay effecient?
function Item(name, val) {
  this.name = name;
  this.value = val;
  ItemDatabase[this.name] = this;
}

// Item.loadJson = function(filename) {
//   // var arr = // load json
//   // arr.forEach(function(item) {
//   //   new Item(item.name, item.value);
//   // })
// }
