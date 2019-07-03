function startGame() {
  InventoryMediator.performTrade(player, "gold", 1, npc, "lockpick", 5);
  InventoryMediator.transferItem(npc, player, "lockpick", 5);
  destroyItem("gold");
  addStat(player, "luck", "value", 5);
  addStat(player, "lockpicking", "status", "on");
  console.log("complete");
}

ready(startGame);
