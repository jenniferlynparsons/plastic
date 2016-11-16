init('plastic-dev.json');

function startGame(){

  console.log(data);

  quest.getQuest();
  questInventory.getInventory();
  player.getCharacter();
  playerInventory.getInventory();
  npc.getCharacter();
  npcInventory.getInventory();

}

ready(startGame());
