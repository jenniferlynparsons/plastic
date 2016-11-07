// Modify Stats & Unlock Behaviors:

// vitals meter
// - custom range
// - custom title/purpose
// - positive and negative values
// can be used for friendship meter, health meter, resource meter, etc.

var vitals = {
  name: "Friendship",
  purpose: "friendship",
  topRange: 20,
  bottomRange: -20
}

// inventory
// - custom maximum
// - custom minimum for auto re-equipping
// - sub-categories
// can have subcategories or multiple instances to track materials, weapons, gifts, etc.

var inventory = {
  name: "General Inventory",
  min:0,
  max:20,
  autoRenew: true,
  cat: "General",
  subCat: ""
}

// utilities/tools
// - take or give
// - custom purpose
// can be used for interaction with environment or other characters

var item = {
  class:"Box",
  interaction: 0, //1 = adds, -1 = subtracts, 0 = no take/give
  purpose: "gift",
  name: "Box of Wonder"
}

// gear
// - enhance or degrade
// can be used to prevent or invite interaction from environment or other characters
//
// skills
// - active/inactive
// - limit slots for use
// useful for characters that have various abilities outside of tools/gear
//
// role
// - custom types for limiting skills, gear, tools, etc.
// - adds/subtracts attributes


// Interaction Features:
//
// pickup/drop off
// - rewards retrieve/discard
//
// NPC interaction
// - vitals counter
// - rewards
// - turn counter/toggle
//
// tasks
// - vitals counter
// - rewards





function Character(name,role,vitals,inventory,money,skills,tools,gear){
    this.id = createCharacterId();
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


EXAMPLE
var mage = new Character("Hawke","Mage",vitalsArray,inventoryArray,moneyArray,skillsArray,toolsArray,gearArray);



var initname = "Hawke";
var initrole = "Mage";
var initvitals = 100;
var initinventory = ["book", "apple", "ring"];
var initmoney = 20;
var initskills = ["fireball","cone of cold","stone fist"];
var inittool = "Apostate Staff";
var initgear = "Smuggler Outfit";

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

var hawke = new Character(initname,initrole,initvitals,initinventory,initmoney,initskills,inittool,initgear);

console.log(hawke);

initvitals -= 10;

console.log(hawke);

document.getElementById('characterinit')
