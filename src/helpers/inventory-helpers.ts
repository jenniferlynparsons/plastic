
Inventory.allInventories = [];

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
};

// #### getTotalItemValue
// returns the total value of the item in the Inventory
InventoryItem.prototype.getTotalItemValue = function() {
  return this.item.value * this.qty;
};

// #### getTotalItemQty
// returns the total quantity of the item in the Inventory
InventoryItem.prototype.getTotalItemQty = function() {
  return this.qty;
};

// ## InventoryMediator
// This is a set of functions that can mediate trades and transfers between inventories.
let InventoryMediator = {};

// #### InventoryMediator.transferItem
// Transfers an item from the sender to the receiver
InventoryMediator.transferItem = function(
  sender,
  receiver,
  itemName,
  quantity
) {
  sender.inventory.removeItem(itemName, quantity);
  receiver.inventory.addItem(itemName, quantity);
};

// #### InventoryMediator.performTrade
// Trades two items between two actors
InventoryMediator.performTrade = function(
  actor1,
  itemName1,
  quantity1,
  actor2,
  itemName2,
  quantity2
) {
  actor1.inventory.addItem(itemName2, quantity2);
  actor2.inventory.addItem(itemName1, quantity1);
  actor1.inventory.removeItem(itemName1, quantity1);
  actor2.inventory.removeItem(itemName2, quantity2);
};

// #### InventoryMediator.getTradeDifference
// Gets the difference (postive/negative value or 0) left if items are traded between two
InventoryMediator.getTradeDifference = function(
  actor1,
  itemName1,
  quantity1,
  actor2,
  itemName2,
  quantity2
) {
  const tradevalue1 =
    actor1.inventory.getItemByName(itemName1).getItemValue() * quantity1;
  const tradevalue2 =
    actor2.inventory.getItemByName(itemName2).getItemValue() * quantity2;
  return tradevalue1 - tradevalue2;
};
