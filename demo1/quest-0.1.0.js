var quest = new Quest({
    "name": "Buy a lockpick",
    "questType": "purchase",
    "state": "open"
  });

  quest.changeState(new Inventory([
    new InventoryItem("lockpick", 1, 5);
  ]));
