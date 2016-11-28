var npc = new Character({
  "name": "Leaf",
  "role": "Shopkeeper",
  "level": 1,
});

npc.inventoryItem(
  new NewInventoryItem("lockpick", 10)
);

// console.log(npc);
// console.log(npc.getInventory());
