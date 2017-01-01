// init('plastic-dev.json');

function startGame(){
  console.log("ItemDatabase:");
  console.log(ItemDatabase);
  console.log("Quest:");
  console.log(quest);
  console.log("Quest State:");
  console.log(quest.getState());
  console.log("Is Quest available?");
  console.log(quest.isAvailable());
  console.log("player:");
  console.log(player);
  console.log("npc:");
  console.log(npc);
  console.log("player inventory:");
  console.log(player.getInventory());

}

ready(startGame());
