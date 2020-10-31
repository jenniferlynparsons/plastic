// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Inventory

// #### Inventory
// Inventory creator function accepts a data object.
export default class Inventory {
  constructor(data) {
    /* TODO check that data is array and not string or something else */
    /* TODO keep track of each inventory in array */
    this.items = data;
    Inventory.allInventories.push(this);
  }

  // #### getInventory
  // returns the Inventory array
  getInventory() {
    return this.items;
  }

  // #### getItemByName
  // returns the Item (truthy) if Item is in the Inventory
  // all items in the inventory must be uniquely named
  getItemByName(queryItemName) {
    return this.items.find(function(item) {
      return item.item.name === queryItemName;
    });
  }

  // #### addItem
  // adds the item to the inventory array
  addItem(name, qty) {
    const newItem = this.getItemByName(name);
    if (newItem && qty != "" && qty != undefined) {
      newItem.qty = newItem.qty + qty;
    } else {
      this.items.push(new InventoryItem(name, qty));
    }
  }

  // #### removeItem
  // subtracts the requested quantity of the item from the inventory array, if the remaining quantity is equal to zero, it removes the item entirely. If the remaining quantity is less than zero, it returns a negative number.
  /* TODO should removeItem be different than updateItem? is it heavy handed to have it removed instead of setting it to 0? */
  removeItem(name, qty) {
    const itemToRemove = this.getItemByName(name);
    if (itemToRemove) {
      if (qty != "" && qty != undefined && itemToRemove.qty - qty >= 0) {
        itemToRemove.qty = itemToRemove.qty - qty;
      } else if (itemToRemove.qty - qty < 0) {
        return itemToRemove.qty - qty;
      }
    }
  }

  deleteItem(name) {
    const itemToDelete = this.getItemByName(name);
    const index = this.items.indexOf(itemToDelete);
    this.items.splice(index, 1);
  }
}