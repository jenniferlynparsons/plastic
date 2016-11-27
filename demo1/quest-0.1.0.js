var quest = new Quest({
  "name": "Buy a lockpick",
  "questType": "purchase",
  "state": "open",
  "precondition": function(){
    return true;
  },
  "postcondition": function(){
    if(typeof player.getInventory().findItem("lockpick") === "undefined"){
      return false;
    }else{
      return true;
    }
    // nasty one liner
    //return typeof player.getInventory().findItem("lockpick") !== "undefined";
  }
});

console.log(quest.getState());
quest.changeState();
console.log(quest.getState());
quest.isAvailable();

console.log(quest);
