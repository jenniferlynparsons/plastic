var newName, chosenName, recipes, chosenRecipe, cook, charNameSpan, taskNameSpan;
var itemListWrap, ingredients;

function CookingCharacter(name, nameElement, task, taskElement){
  Character.call(this, name, nameElement, task, taskElement);
}

function PantryItems(name, min, max, autoRenew, itemList, itemListWrap, updateSuccess, updateFail, removeSuccess, removeFail){
    Inventory.call(this, name, min, max, autoRenew, itemList, itemListWrap, updateSuccess, updateFail, removeSuccess, removeFail);
}

CookingCharacter.prototype = Object.create(Character.prototype);
PantryItems.prototype = Object.create(Inventory.prototype)

document.addEventListener("DOMContentLoaded", function() {

  navAnchors("nextStep");

  function getStarted(){
    newName = document.getElementById("newName");
    chosenName = getInputVal(newName);

    recipes = document.getElementsByName('recipe');
    chosenRecipe = checkRadio(recipes);

    charNameSpan = document.getElementsByClassName('charName');
    taskNameSpan = document.getElementsByClassName('recipeName');

    cook = new CookingCharacter(chosenName, charNameSpan, chosenRecipe, taskNameSpan);
    cook.printName();
    cook.printTask();

    itemList = ['apples', 'cinnamon', 'crust'];
    itemListWrap = document.getElementsByClassName('itemListWrapper');

    pantry = new PantryItems("Pantry", 0, 10, true, itemList, itemListWrap, "It added", "It didn't add", "It removed", "It didn't remove");

    pantry.printItems();
  }

  function step3(){
      ingredients = document.getElementsByName('newIngredient');
      chosenIngredient = checkRadio(ingredients);
      pantry.addItem(chosenIngredient);
  }

  document.getElementById('newChar').addEventListener("click", function(e) {
    getStarted();
  });

  document.getElementById('newIngredient').addEventListener("click", function(e) {
    step3();
  });


});
