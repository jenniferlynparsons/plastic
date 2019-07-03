// inventories
viewInventory() // return list of items in inventory
emptyInventory() // remove everything from the inventory
destroyInventory() // completely deletes the inventory

itemIsInInventory() // is the item in the inventory
addToInventory() // add item to inventory
removeFromInventory() // remove item from inventory


// items
viewItemProps() // what are the item's properties?
createItem() // create an item
destroyItem() // destroy an item
itemIsEquippable() // item can be equipped by a character
equipItem() //equip the item to the character
useInventoryItem() // use an inventory item in the interaction


// activities
activityExists() // does the activity exist?
activityAvailable() // can the activity be started?
openActivity() // make the activity activity
closeActivity() // make the activity unavailable
startInteraction() // start interacting with the activity
endInteraction() // end the interaction
viewAvailableActivities() // returns list of available activities


// character stats
// stats can be modified by inventory items and by interactions
viewStats() // returns list of stats
statActive() // does the stat exist?
statValue() // returns stat value
modifyValue() // add or subtract from stat value
statStatus() // returns if stat is locked or unlocked
