// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// General plastic functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

function Plastic(){

}

// http://libux.co/useful-function-making-queryselectorall-like-jquery/
function _p(selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
}

// thanks Sal
function mergeDefaults(obj, defaults, propList){
    Object.assign(obj, defaults);
    Object.assign(obj, propList);
}


// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// UI functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

// On click of element, the element with ID matching href is shown, the current visible element is hidden.
// This can be used two ways. Typically, it would be used to navigate between "pages" of the game,
// but it could also be used to hide/reveal bits of information or interactions on the same page.
function next(anchor, currentVisible){
    var current = _p(currentVisible);
    current.classList.add('hidden');
    var destination = anchor.getAttribute("href").replace(/[^a-zA-Z 0-9]+/g,"");
    _p(next).classList.remove('hidden');
    e.preventDefault();
}

// To output a string to an HTML container
function printThing(info, wrapper){
    wrapper.innerHTML(info);
}

// This will always output a <ul> with inner <li>s and insert them into the wrapper element
function printInventory(plastic, wrapper){
    var printItems;
    for (var i = 0, length = plastic.items.length; i < length; ++i) {
        printItems += "<li>" + items[i] + "</li>";
    }
    var printList = "<ul>" + printItems + "</ul";
    wrapper.innerHTML(printList);
}


// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// form element functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

// TODO: the form elements should be processed on click of submit

// TODO: could be handled with an array of elements?
function getInputVal(inputId){
    return inputId.value;
}

function checkRadio(radioName){
    for (var i = 0, length = radioName.length; i < length; i++) {
        if (radioName[i].checked) {
            return radioName[i].value;
        }
    }
}


// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Character functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

function Character(plastic, propList){
    var defaults = {name:"Character", currentQuest: "none"};
    mergeDefaults(this, defaults, propList);
};


// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// inventory functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

function Inventory(propList){
    var defaults = {name: "Default Inventory", min: 0, max: 100, updateSuccess: "Item Added", updateFail: "Inventory Full", removeSuccess: "Item Removed", removeFail: "Inventory Empty"};
    mergeDefaults(this, defaults, propList);
}

Inventory.prototype.addItem = function(plastic, newItem){
    if(plastic.itemList.length < plastic.max){
        plastic.itemList.push(newItem);
        return plastic.updateSuccess;
    }else{
        return plastic.updateFail;
    }
}

Inventory.prototype.subtractItem = function(removeItem){
    var shorterArray;
    for(var i = 0, listLength = plastic.itemList.length; i <= listLength; i++){
        if(plastic.itemList[i] === removeItem){
            shorterArray = plastic.itemlist.splice(plastic.itemlist[i], 1);
        }
    }
    if(shorterArray.length > plastic.min){
        plastic.itemList = plastic.itemList.remove(removeItem);
        return plastic.removeSuccess;
    }else{
        return plastic.removeFail;
    }
}
