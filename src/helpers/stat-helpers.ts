// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Stats Calculator

function statCalc(entity, stat) {
  // should this calculate all stats in one swoop or just the total for one stat?
  // grab entity stats
  const estat = entity.stats[stat];
  // grab entity inventory
  const einventory = entity.inventory.items;
  // get inventory item stats
  einventory.filter(stats[estat]);
}

// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Stats CRUD Functions

// check if the stat doesn't exist then add it to the stats object
function addStat(entity, stat, attr, val) {
  if (!entity.stats[stat]) {
    const attrObj = {};
    attrObj[attr] = val;
    entity.stats[stat] = attrObj;
  } else {
    throw new Error("This stat already exists");
  }
}

// find the stat and return it if it exists
function getStat(entity, stat) {
  if (entity.stats[stat] != "" && entity.stats[stat] != undefined) {
    return entity.stats[stat];
  }
}

// TODO a way to store the modifiers for later comparision
function updateStat(entity, stat, attr, val, mod) {
  // if the stat exists add or subtract the val
  // if it's a string or integer it needs to be handled differently
  if (getStat(entity, stat)) {
    if (typeof entity.stats[stat][attr] == "string") {
      replaceStat(entity, stat, attr, val);
    } else if (typeof entity.stats[stat][attr] == "number") {
      modifyStat(entity, stat, attr, val, mod);
    }
  }
}

function replaceStat(entity, stat, attr, val) {
  // if the stat exists add or subtract the val
  entity.stats[stat][attr] = val;
}

function modifyStat(entity, stat, attr, val, mod) {
  // if the stat exists add or subtract the val
  const originalStat = entity.stats[stat][attr];
  entity.stats[stat][attr] = mathy(mod, originalStat, val);
}

function deleteStat(entity, stat) {
  // if the stat exists, delete it
  if (entity.getStat(stat)) {
    delete entity.stats[stat];
  }
}

function getAllStats(entity) {
  return entity.stats;
}