var name = "Hawke";
var role = "Mage";
var vitals = 100;
var inventory = ["journal pages", "apple", "ring"];
var money = 20;
var skills = ["fireball","cone of cold","stone fist"];
var tool = "Apostate Staff";
var gear = "Smuggler Outfit";

function Character(name,role,vitals,inventory,money,skills,tools,gear){
  this.name = name;
  this.role = role;
  this.vitals = vitals;
  this.inventory = inventory;
  this.money = money;
  this.skills = skills;
  this.tools = tools;
  this.gear = gear;
};

var hawke = new Character(name,role,vitals,inventory,money,skills,tool,gear);

console.log(hawke);

hawke.vitals -= 10;

console.log(hawke);
