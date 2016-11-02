var itemPurposes = [
  characterInteract = true,
  statInteract = true,
  itemInteract = true
]

// items sample
// having this function fire when added to a cache will enable randomization of items in cache and also the ability to randomize the stats of the items.

function makeItem(){
  this.name = ""; // a string
  this.tradeValue = 5; // units of trade/money item is worth
  this.purpose = "character damage"; // character heal, stat enhance, stat degrade, item create, item destory
  this.purposeValue = 5; // amount of purpose deployed on use
}

// gear inventory sample

function Inventory(){
  this.name = "Player Gear";
  this.minimum = 0;
  this.maximum = 10;
  this.inventoryType = "armor"
  this.items = {
    head: "helmet";
    body: "chainmail";
    feet: "heavy boots";
    hands: "heavy gloves";
  };
}
