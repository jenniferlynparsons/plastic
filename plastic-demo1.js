var plastic = new Plastic({});
var state = {};

function CookingCharacter(plastic, charProperties){
  Character.call(this, plastic, charProperties);
}

function PantryItems(plastic, itemProperties){
    Inventory.call(this, plastic, itemProperties);
}

CookingCharacter.prototype = Object.create(Character.prototype);
PantryItems.prototype = Object.create(Inventory.prototype)

document.addEventListener("DOMContentLoaded", function() {

  navAnchors("nextStep","box");

  function getStarted(plastic){
    plastic.newName = document.getElementById("newName");
    plastic.chosenName = getInputVal(plastic.newName);

    state.recipes = document.getElementsByName('recipe');
    plastic.chosenRecipe = checkRadio(plastic.recipes);

    plastic.charNameSpan = document.getElementsByClassName('charName');
    plastic.taskNameSpan = document.getElementsByClassName('recipeName');

    plastic.cook = new CookingCharacter(plastic);
    state.cook.printName();
    state.cook.printTask();

    plastic.itemList = ['apples', 'cinnamon', 'crust'];
    plastic.itemListWrap = document.getElementsByClassName('itemListWrapper');

    state.pantry = new PantryItems(plastic, "Pantry", 0, 10, true, "It added", "It didn't add", "It removed", "It didn't remove");

    plastic.printItems(state.pantry, state.itemListWrap);
  }

  function step3(plastic){
      plastic.ingredients = document.getElementsByName('newIngredient');
      plastic.chosenIngredient = checkRadio(plastic.ingredients);
      pantry.addItem(chosenIngredient);
      pantry.printItems();
  }

  document.getElementById('newChar').addEventListener("click", function(e) {
    getStarted(plastic);
  });

  document.getElementById('newIngredient').addEventListener("click", function(e) {
    step3(plastic);
  });


});
