// init('plastic-dev.json');

function startGame(){
  // try{
  //   new Quest({});
  // }catch(e){
  //   console.log(e);
  //   console.log("We know what we're doing and we don't care. :P");
  // }
  console.log("ItemDatabase:");
  console.log(ItemDatabase);
  console.log("player inventory:");
  console.log(player.inventory.getInventory());
  console.log("player inventory item");
  console.log(player.inventory.inInventory("gold"));
  console.log("adding an item");
  player.inventory.addItem("gold",1);
  console.log(player.inventory.getInventory());
  console.log("gold value:");
  console.log(player.inventory.getItemValue("gold"));
  console.log("total gold value:");
  console.log(player.inventory.getTotalItemValue("gold"));
  console.log();
  inventoryMediator(player,"gold", 1, npc, "lockpick", 5);
}

ready(startGame);
