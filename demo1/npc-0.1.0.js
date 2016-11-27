var npc = new Character({
  "name": "Leaf",
  "role": "Shopkeeper",
  "level": 1,
});

npc.inventoryItem(
  new InventoryItem("lockpick", 10)
);

// console.log(npc);
// console.log(npc.getInventory());
