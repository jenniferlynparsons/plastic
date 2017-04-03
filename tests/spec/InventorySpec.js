describe("Inventory", function() {
  var inventory;
  var testInventory = [{"item":{"name":"gold","value":5},"qty":10},{"item":{"name":"lockpick","value":1},"qty":10}];

  beforeEach(function() {
    inventory = new Inventory(testInventory);
  });

  it("should create an inventory", function(){
    inventory = new Inventory(testInventory);
    expect(inventory.items).toEqual(testInventory);
  });

  it("should get the inventory", function(){
    expect(inventory.getInventory()).toEqual(inventory.items);
  });

  it("should get the requested item by name", function(){
    expect(inventory.getItemByName("gold")).toEqual({"item":{"name":"gold","value":5},"qty":10});
  });

  it("should add an item to the inventory", function(){
    inventory.addItem("gold", 5)
    expect(testInventory).toEqual([{"item":{"name":"gold","value":5},"qty":15},{"item":{"name":"lockpick","value":1},"qty":10}]);
  });

  it("should remove an item from the inventory", function(){
    inventory.removeItem("gold", 5);
    expect(testInventory).toEqual([{"item":{"name":"gold","value":5},"qty":10},{"item":{"name":"lockpick","value":1},"qty":10}]);
  });

  it("should delete an item from the inventory", function(){
    inventory.deleteItem("gold");
    expect(testInventory).toEqual([{"item":{"name":"lockpick","value":1},"qty":10}]);
  });
});

describe("InventoryItem", function() {
  var inventoryItem;
  // var testItem = {"item": {"name": "silver", "value": 1 }, "qty": 10};
  beforeEach(function() {
    // TODO: ItemDatabase used in InventoryItem is using the empty plastic library object. find a workaround.
    var databaseItem = new Item("silver", 1);
    inventoryItem = new InventoryItem("silver", 5);
  });

  // TODO: ItemDatabase used in InventoryItem is using the empty plastic library object. find a workaround.
  it("an inventory item should be available", function(){
    expect(inventoryItem.item.name).toEqual("silver");
    expect(inventoryItem.qty).toEqual(5);
  });

  // TODO: these 3 tests are all saying the function being passed is not a function.
  it("should return the item's individual value", function(){
    expect(inventoryItem.getItemValue()).toEqual(1);
  });

  // it("should return the item's total value", function(){
  //   expect(inventoryItem.getTotalItemValue()).toEqual(10);
  // });
  //
  // it("should return the item's quantity", function(){
  //   expect(inventoryItem.getTotalItemQty()).toEqual(10);
  // });
});

//
// describe("InventoryMediator", function() {
//
//   beforeEach(function() {
//   });
// });
