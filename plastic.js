// https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadJSON(callback, datasrc) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', datasrc, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

var data;

function init(datasrc) {
 loadJSON(function(response) {
  // Parse JSON string into object
    data = JSON.parse(response);
 }, datasrc);
}

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

function GameState(data){
  
}



function Character(data){
  this.name = data.name;
  this.role = data.role;
  this.level = data.level;
  this.inventory = data.inventory;
}



function Inventory(data) {
  this.name = data.name;
  this.items = data.items;
}
Inventory.prototype.getInventory = function() {
  return this.items;
}

function InventoryMediator(){}
InventoryMediator.prototype.add = function(){

}
InventoryMediator.prototype.remove = function(){

}
