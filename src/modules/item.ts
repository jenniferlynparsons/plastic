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
/* TODO add IDs to allInventories for more flexibility */
function destroyItem(name) {
  delete ItemDatabase[name];
  Inventory.allInventories
    .filter(function(inventory) {
      return inventory.getItemByName(name);
    })
    .map(function(inventory) {
      inventory.deleteItem(name);
    });
}