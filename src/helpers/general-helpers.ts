// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Game Helpers

// #### ready
// This is a simple Document ready function to test if the DOM is fully loaded.
// It fires the function passed as a parameter if the DOM is ready, otherwise, it adds an event listener that will fire once the DOM finishes loading.
// original source: http://youmightnotneedjquery.com/
export function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

// #### loadJSON
// This is a local JSON file loading function for testing purposes such as loading an entire GameState
// https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
// Change 'false' to 'true' in open call for asynchronous loading
export function loadJSON(callback, datasrc) {
  const xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", datasrc, false);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      /* Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode */
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

// This is the local JSON file loader call where we parse JSON string into object
export function init(datasrc) {
  loadJSON(function(response) {
    data = JSON.parse(response);
  }, datasrc);
}

// #### propertyExists
// This checks if the property of length exists (string or array) for a basic check on data validity
export function propertyExists(data, name) {
  if (
    !data.hasOwnProperty(name) ||
    !data[name].hasOwnProperty("length") ||
    data[name].length == 0
  ) {
    throw new Error(name + " has some information missing or malformed");
  } else {
    return true;
  }
}

// #### gotData
// This is an alternate simple data check
export function gotData(data) {
  if (data !== undefined && data) return true;
  else throw new Error("There is no data.");
}

