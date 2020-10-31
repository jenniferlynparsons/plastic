var quest = new Quest({
  name: "Buy a lockpick",
  questType: "purchase",
  state: "open",
  precondition: function() {
    return true;
  },
  postcondition: function() {
    return typeof player.getInventory().findItem("lockpick") !== "undefined";
  }
});
