// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Helpers

// #### ready
// This is a simple Document ready function to test if the DOM is fully loaded.
// It fires the function passed as a parameter if the DOM is ready, otherwise, it adds an event listener that will fire once the DOM finishes loading.
// original source: http://youmightnotneedjquery.com/
function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// #### loadJSON
// This is a local JSON file loading function for testing purposes such as loading an entire GameState
// https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
// Change 'false' to 'true' in open call for asynchronous loading
function loadJSON(callback, datasrc) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', datasrc, false);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            /* Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode */
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

// This is the local JSON file loader call where we parse JSON string into object
var data;

function init(datasrc) {
    loadJSON(function(response) {
        data = JSON.parse(response);
    }, datasrc);
}

// #### propertyExists
// This checks if the property of length exists (string or array) for a basic check on data validity
function propertyExists(data, name) {
    if (!data.hasOwnProperty(name) || !data[name].hasOwnProperty("length") || data[name].length == 0) {
        throw new Error(name + " has some information missing or malformed");
    } else {
        return true;
    }
}

// #### gotData
// This is an alternate simple data check
function gotData(data) {
    if (data !== undefined && data) return true;
    else throw new Error("There is no data.")
}

// #### Simple helpers
// These are basic bits and pieces that are useful throughout the library and games

function mathy(operator, x, y) {
    if (operator == "add") {
        return x + y;
    } else if (operator == "subtract") {
        return x - y;
    } else if (operator == "multiply") {
        return x * y;
    } else if (operator == "divide") {
        return x / y;
    } else if (operator == "modulus") {
        return x % y;
    }
}

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## General Game Data

// #### GameState
// The GameState creator currently is an empty function that accepts a data object parameter.
// function GameState(data){};

// #### ItemDatabase
// The ItemDatabase is an empty object that holds the list of game item objects.
var ItemDatabase = {};

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Quest

// #### Quest
// The Quest creator function accepts a data object.
function Quest(data) {
    if (propertyExists(data, "name") && propertyExists(data, "state")) {
        this.name = data.name;
        this.state = data.state;
    }
    if (data.questType) {
        this.questType = data.questType;
    }
    if (data.precondition) {
        this.precondition = data.precondition;
    } else {
        this.precondition = function() { return true; }
    }
    if (data.postcondition) {
        this.postcondition = data.postcondition;
    } else {
        this.postcondition = function() { return true; }
    }
    if (data.inventory) {
        this.inventory = new Inventory(data.inventory);
    } else {
        this.inventory = new Inventory([]);
    }
}

// #### changeState
// Updates the Quest state and availability
Quest.prototype.changeState = function() {
    if (this.isAvailable()) {
        this.state = "active";
    } else if (this.isCompleteable()) {
        this.state = "closed";
    }
}

// #### isAvailable
// Returns true if the Quest is available to start otherwise returns false.
Quest.prototype.isAvailable = function() {
    return this.state == "open" && this.precondition();
}

// #### isActive
// returns true if the Quest is active otherwise returns false
Quest.prototype.isActive = function() {
    return this.state == "active";
}

// #### isCompleteable
// returns true if the Quest is complete otherwise returns false
Quest.prototype.isCompleteable = function() {
    return this.state == "active" && this.postcondition();
}

// #### isComplete
// returns true if the Quest is complete otherwise returns false
Quest.prototype.isComplete = function() {
    return this.state == "closed";
}

// #### getState
// returns the current Quest state string
Quest.prototype.getState = function() {
    return this.state;
}


// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Character

// #### Character
// The Character creator function accepts a data object.
function Character(data) {
    if (propertyExists(data, "name")) {
        this.name = data.name;
    }
    if (data.role) {
        this.role = data.role;
    }
    if (data.level) {
        this.level = data.level;
    }
    if (data.inventory) {
        this.inventory = new Inventory(data.inventory);
    } else {
        this.inventory = new Inventory([]);
    }
    if (data.stats) {
        this.stats = data.stats;
    }
}
// TODO a small function to check if a stat exists

// check if the stat doesn't exist then add it to the stats object
Character.prototype.addStat = function(stat, attr, val) {
    if (!this.stats[stat]) {
        var attrObj = {};
        attrObj[attr] = val;
        this.stats[stat] = attrObj;
    } else {
        throw new Error("This stat already exists");
    }
}

// find the stat and return it if it exists
Character.prototype.getStat = function(stat) {
    if (this.stats[stat] != "" && this.stats[stat] != undefined) {
        return this.stats[stat];
    }
}

Character.prototype.updateStat = function(stat, attr, val, mod) {
    // if the stat exists add or subtract the val
    // if it's a string or integer it needs to be handled differently
    if (this.stats[stat] != "" && this.stats[stat] != undefined) {
        if (typeof this.stats[stat][attr] == "string") {
            this.replaceStat(stat, attr, val);
        } else if (typeof this.stats[stat][attr] == "number") {
            this.modifyStat(stat, attr, val, mod);
        }
    }
}

Character.prototype.replaceStat = function(stat, attr, val) {
    // if the stat exists add or subtract the val
    this.stats[stat][attr] = val;
}

Character.prototype.modifyStat = function(stat, attr, val, mod) {
    // if the stat exists add or subtract the val
    var originalStat = this.stats[stat][attr];
    console.log("modify stat");
    console.log(originalStat);
    this.stats[stat][attr] = mathy(mod, originalStat, val);
    console.log(this.stats[stat][attr]);
}

Character.prototype.deleteStat = function(stat) {
    if (this.stats[stat] != "" && this.stats[stat] != undefined) {
        delete this.stats[stat];
    }
}

Character.prototype.getAllStats = function() {
    return this.stats;
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
    /* TODO check that data is array and not string or something else */
    /* TODO keep track of each inventory in array */
    this.items = data;
    Inventory.allInventories.push(this);
}

Inventory.allInventories = [];

// #### getInventory
// returns the Inventory array
Inventory.prototype.getInventory = function() {
    return this.items;
}

// #### getItemByName
// returns the Item (truthy) if Item is in the Inventory
// all items in the inventory must be uniquely named
Inventory.prototype.getItemByName = function(queryItemName) {
    return this.items.find(function(item) {
        return item.item.name === queryItemName;
    });
}

// #### addItem
// adds the item to the inventory array
Inventory.prototype.addItem = function(name, qty) {
    var newItem = this.getItemByName(name);
    if (newItem && qty != "" && qty != undefined) {
        newItem.qty = newItem.qty + qty;
    } else {
        this.items.push(new InventoryItem(name, qty));
    }
}

// #### removeItem
// subtracts the requested quantity of the item from the inventory array, if the remaining quantity is equal to zero, it removes the item entirely. If the remaining quantity is less than zero, it returns a negeative number.
/* TODO should removeItem be different than updateItem? is it heavy handed to have it removed instead of setting it to 0? */
Inventory.prototype.removeItem = function(name, qty) {
    var itemToRemove = this.getItemByName(name);
    if (itemToRemove) {
        if (qty != "" && qty != undefined && (itemToRemove.qty - qty) >= 0) {
            itemToRemove.qty = itemToRemove.qty - qty;
        } else if ((itemToRemove.qty - qty) < 0) {
            return itemToRemove.qty - qty;
        }
    }
}

Inventory.prototype.deleteItem = function(name) {
    var itemToDelete = this.getItemByName(name);
    var index = this.items.indexOf(itemToDelete);
    this.items.splice(index, 1);
}

// #### InventoryItem
// creates a new Inventory Item
function InventoryItem(name, qty) {
    if (ItemDatabase[name] != "" && ItemDatabase[name] != undefined) {
        this.item = ItemDatabase[name];
        if (qty != "" && qty != undefined) {
            this.qty = qty;
        }
    }
}

// #### getItemValue
// returns the value of the item
InventoryItem.prototype.getItemValue = function() {
    return this.item.value;
}

// #### getTotalItemValue
// returns the total value of the item in the Inventory
InventoryItem.prototype.getTotalItemValue = function() {
    return this.item.value * this.qty;
}

// #### getTotalItemQty
// returns the total quantity of the item in the Inventory
InventoryItem.prototype.getTotalItemQty = function() {
    return this.qty;
}

// ## InventoryMediator
// This is a set of functions that can mediate trades and transfers between inventories.
var InventoryMediator = {};

// #### InventoryMediator.transferItem
// Transfers an item from the sender to the receiver
InventoryMediator.transferItem = function(sender, receiver, itemName, quantity) {
    sender.inventory.removeItem(itemName, quantity);
    receiver.inventory.addItem(itemName, quantity);
}

// #### InventoryMediator.performTrade
// Trades two items between two actors
InventoryMediator.performTrade = function(actor1, itemName1, quantity1, actor2, itemName2, quantity2) {
    actor1.inventory.addItem(itemName2, quantity2);
    actor2.inventory.addItem(itemName1, quantity1);
    actor1.inventory.removeItem(itemName1, quantity1);
    actor2.inventory.removeItem(itemName2, quantity2);
}

// #### InventoryMediator.getTradeDifference
// Gets the difference (postive/negative value or 0) left if items are traded between two
InventoryMediator.getTradeDifference = function(actor1, itemName1, quantity1, actor2, itemName2, quantity2) {
    var tradevalue1 = actor1.inventory.getItemByName(itemName1).getItemValue() * quantity1;
    var tradevalue2 = actor2.inventory.getItemByName(itemName2).getItemValue() * quantity2;
    return tradevalue1 - tradevalue2;
}

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Item

// #### Item creator
// Item creator adds a new item to the ItemDatabase
function Item(name, val) {
    this.name = name;
    this.value = val;
    ItemDatabase[this.name] = this;
}

/* TODO should also remove the item from any inventory */
// #### Item destroyer
// destroyItem deletes an item from the ItemDatabase as well as removing it from all inventories
/* TODO use map and add IDs to allInventories for better performance */
function destroyItem(name) {
    delete ItemDatabase[name];

    // do it with a for loop
    for (var i = 0, length = Inventory.allInventories.length; i < length; i++) {
        Inventory.allInventories[i].deleteItem(name);
    }

    // do it with map
    Inventory.allInventories.map(deleteItem(name));
}