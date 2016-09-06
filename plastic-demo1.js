var newName, chosenName, recipes, chosenRecipe, cook, charNameSpan, taskNameSpan;

function CookingCharacter(name, nameElement, task, taskElement){
    Character.call(this, name, nameElement, task, taskElement);
}

CookingCharacter.prototype = Object.create(Character.prototype);

document.addEventListener("DOMContentLoaded", function() {

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
    }

    document.getElementById('newChar').addEventListener("click", function(e) {
        getStarted();
    });
});
