var player = new Character({
  "name": "Harper",
  "role": "Rogue",
  "level": 1
});

// HI CECELIA! this is the call that's not working properly. 
// when this is called, player is created and has an empty inventory array.
// not sure if the NewInventoryItem function is needed or if it would be better to just call new InventoryItem
player.addInventoryItem(
  new NewInventoryItem("gold", 10)
);

// console.log(player);
// console.log(player.getInventory());
