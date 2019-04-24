var quest = new Quest({
  "name": "Buy a lockpick",
  "questType": "purchase",
  "state": "open",
  "precondition": function(){
    return true;
  },
  "postcondition": function(){
    if(typeof player.inventory.findItem("lockpick") === "undefined"){
      return false;
    }else{
      return true;
    }
    // nasty one liner option
    //return typeof player.getInventory().findItem("lockpick") !== "undefined";
  }
});
