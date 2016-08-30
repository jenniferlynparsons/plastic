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

init.vitals -= 10;

console.log(hawke);

document.getElementById('characterinit')
