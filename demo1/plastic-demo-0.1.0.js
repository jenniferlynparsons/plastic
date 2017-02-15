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
  console.log(player.inventory.getItemByName("gold"));
  console.log("adding an item");
  player.inventory.addItem("gold",1);
  player.inventory.removeItem("silver",10);
  console.log(player.inventory.getInventory());
  console.log("gold value:");
  console.log(player.inventory.getItemByName("gold").getItemValue());
  console.log("player's total gold value:");
  console.log(player.inventory.getItemByName("gold").getTotalItemValue());
  console.log("trade difference");
  console.log(InventoryMediator.getTradeDifference(player,"gold", 5, npc, "lockpick", 5));
  console.log("performing trade");
  InventoryMediator.performTrade(player,"gold", 1, npc, "lockpick", 5);
  console.log("player inventory:");
  console.log(player.inventory.getInventory());
  console.log("npc inventory:");
  console.log(npc.inventory.getInventory());
  console.log("transfering item");
  InventoryMediator.transferItem(npc, player, "lockpick", 5);
  console.log("player inventory:");
  console.log(player.inventory.getInventory());
  console.log("npc inventory:");
  console.log(npc.inventory.getInventory());
  destroyItem("gold");
  player.inventory.deleteItem("silver");
  console.log("player inventory:");
  console.log(player.inventory.getInventory());
   console.log("ItemDatabase:");
  console.log(ItemDatabase);
}

ready(startGame);
