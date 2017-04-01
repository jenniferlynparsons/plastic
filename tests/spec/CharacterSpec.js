describe("Character", function() {
  var character;
  var names = ["Leaf","Harper","Steel"];
  var roles = ["Shopkeeper","Rogue","Baker"];
  var levels = [1,2,3];

  beforeEach(function() {
    character = new Character({
      "name": "Leaf",
      "role": "Shopkeeper",
      "level": 1,
      "inventory": []
    });
    character.inventory.addItem("lockpick", 10);
  });

  function testCreateCharacter(name,role,level){
    it("should create a character", function() {
      character = new Character({
        "name": name,
        "role": role,
        "level": level,
        "inventory": []
      });
      expect(character.name).toEqual(name);
      expect(character.role).toEqual(role);
      expect(character.level).toEqual(level);
    });
  };

  for(var i = 0, length=names.length; i < length; i++) {
    testCreateCharacter(names[i], roles[i], levels[i]);
  };
});
