describe("Item", function() {
  var item;
  var names = ["lockpick", "gold", "silver"];
  var values = [10,10,5];
  var ItemDatabase = {};

  function testCreateItem(name,value){
    it("should create a item", function() {
      item = new Item(name,value);
      expect(item.name).toEqual(name);
      expect(item.value).toEqual(value);
    });
  };

  for(var i = 0, length=names.length; i < length; i++) {
    testCreateItem(names[i], values[i]);
  };
});
