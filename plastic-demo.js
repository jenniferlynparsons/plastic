init('plastic-dev.json');

function startGame(){

  console.log(data);

  var game = new GameState(data.game);
  var quest = new Quest(data.game.quest);
  var player = new Character(data.game.player);
  var npc = new Character(data.game.npc1);


  quest.getQuest(quest);
  quest.getInventory(quest.inventory.items);
  player.getCharacter(player);
  player.getInventory(player.inventory.items);
  npc.getCharacter(npc);
  npc.getInventory(npc.inventory.items);

}
$( document ).ready(function() {
  startGame();
});
