// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Character

// #### Character
// The Character creator function accepts a data object.
class Character {
  constructor(data) {
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