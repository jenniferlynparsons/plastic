describe("Quest", function() {
  var quest;
  var names = ["Buy a lockpick","Gather mushrooms","Deliver the jewel"];
  var types = ["purchase","collect","deliver"];
  var states = ["open","active","closed"];

  beforeEach(function() {
    quest = new Quest({
      "name": "Buy a lockpick",
      "questType": "purchase",
      "state": "open",
      "precondition": function(){
        return true;
      },
      "postcondition": function(){
        return false;
      }
    });
  });

  function testCreateQuest(name,type,state){
    it("should create a quest", function() {
      quest = new Quest({
        "name": name,
        "questType": type,
        "state": state,
        "precondition": function(){
          return true;
        },
        "postcondition": function(){
          return false;
        }
      });
      expect(quest.name).toEqual(name);
      expect(quest.questType).toEqual(type);
      expect(quest.state).toEqual(state);
    });
  };

  for(var i = 0, length=names.length; i < length; i++) {
    testCreateQuest(names[i], types[i], states[i]);
  };

  it("should change the quest state", function() {
    quest.changeState();
    expect(quest.state).toEqual("active");
  });

  it("should close the quest state", function() {
    quest.state = "active";
    quest.postcondition = function(){return true};
    quest.changeState();
    expect(quest.state).toEqual("closed");
  });

  it("should report if the quest is available", function() {
    expect(quest.isAvailable()).toBeTruthy();
  });

  it("should report if the quest is active", function() {
    quest.state = "active";
    expect(quest.isActive()).toBeTruthy();
  });

  it("should report if the quest is ready to be completed", function() {
    quest.state = "active";
    quest.postcondition = function(){return true};
    expect(quest.isCompleteable()).toBeTruthy();
  });

  it("should report if the quest is complete", function() {
    quest.state = "closed";
    expect(quest.isComplete()).toBeTruthy();
  });

  it("should return the current state of the quest", function() {
    expect(quest.getState()).toEqual(quest.state);
  });

});
