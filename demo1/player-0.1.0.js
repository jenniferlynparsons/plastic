var player = new Character({
  "name": "Harper",
  "role": "Rogue",
  "level": 1,
  "stats": {
              "strength": {
                "value": 20
              },
              "dexterity": {
                "value": 40
              }
            }
});

player.inventory.addItem("gold", 10);
player.inventory.addItem("silver", 10);
