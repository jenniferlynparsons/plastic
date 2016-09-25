document.addEventListener("DOMContentLoaded", function() {

    var plastic = new Plastic({});
    var state = {};

    function Character(plastic, charProperties){
        Character.call(this, plastic, charProperties);
    }

    function Items(plastic, itemProperties){
        Inventory.call(this, plastic, itemProperties);
    }

    Character.prototype = Object.create(Character.prototype);
    Items.prototype = Object.create(Inventory.prototype)


    function getStarted(plastic){
        // TODO: this goes into an inifinte loop
        // plastic.character = new Character(plastic);

        // TODO: this doesn't work because _p returns an array
        plastic.chosenName = getInputVal(_p("#newName"));
        state.chosenQuest = checkRadio(_p("#questpicker1 input"));

        printThing(plastic.chosenName, _p('.charname'));
        printThing(state.chosenQuest, _p('.questname'));



        plastic.itemList = ['thing one', 'thing two', 'thing three'];

        state.items = new Items(plastic, {name: "Inventory", min: 0, max: 10, autorenew: false, itemList:plastic.itemList, addSuccess:"It added", addFail: "It didn't add", removeSuccess: "It removed", removeFail: "It didn't remove"});

        plastic.printInventory(state.items.itemList, _p('#itemListWrapper'));
    }

    function step3(plastic){
        plastic.things = document.getElementsByName('newQuestItem');
        plastic.chosenThing = checkRadio(plastic.things);
        state.items.addItem(chosenThing);
        state.items.printInventory();
    }

    _p('#newChar').forEach(function(i){
        i.addEventListener("click", function(e) {
            getStarted(plastic);
        });
    });

    _p('#newItem').forEach(function(i){
        i.addEventListener("click", function(e) {
            step3(plastic);
        });
    });


});
