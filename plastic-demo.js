init('plastic-dev.json');

function startGame(){

  console.log(data);

  var game = new GameState(data.game);
  var quest = new Quest(data.game.quest);
  var questInventory = new Inventory(data.game.quest.inventory);
  var player = new Character(data.game.player);
  var playerInventory = new Inventory(data.game.player.inventory);
  var npc = new Character(data.game.npc1);
  var npcInventory = new Inventory(data.game.npc1.inventory);

  quest.getQuest(quest);
  questInventory.getInventory(questInventory.items);
  player.getCharacter(player);
  playerInventory.getInventory(playerInventory.items);
  npc.getCharacter(npc);
  npcInventory.getInventory(npcInventory.items);

}

ready(startGame());
