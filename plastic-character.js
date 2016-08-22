// todo: figure out how to incorporate multiple meters or have vitals be an array of meters, the same for tools, gear, and inventory

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


var vitalsArray = [healthlvl,lovelvl,swaggerlvl];
var inventoryArray = [valuableslist,herbslist,potionslist];
var moneyArray = [moneyCurrent,moneyMin,moneyMax];
var skillsArray = [offensiveSkills,defensiveSkills,gadgetsSkills];
var toolsArray = [offensiveTools,defensiveTools,gadgetsTools];
var gearArray = [body,hands,feet,head];


// EXAMPLE
var mage = new Character("Hawke","Mage",vitalsArray,inventoryArray,moneyArray,skillsArray,toolsArray,gearArray);
