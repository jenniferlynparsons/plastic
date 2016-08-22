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
// - damage or heal
// - custom purpose
// can be used for interaction with environment or other characters

var item = {
  class:"Box",
  interaction: 0, //1 = adds, -1 = subtracts, 0 = no damage/healing
  purpose: "gift",
  name: "Box of Wonder"
}

// gear
// - protection or damage
// can be used to prevent or invite interaction from environment or other characters

// skills
// - active/inactive
// - slots for use
// useful for characters that have various abilities outside of weapons/armor

// role
// - custom types for limiting skills, armor, weapons, etc.
// - adds/subtracts attributes


// Interaction Features:

// pickup/drop off
// - rewards

// NPC interaction
// - nudge counter
// - rewards
// - turn counter/toggle
