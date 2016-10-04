/* eslint-disable no-unused-vars */
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// General plastic functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

// blargh. i don't quite know why i need this right now but i do. once i understand it better, it will all be fixed.
function Plastic () {

}

// Polyfill for .includes https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
if (!String.prototype.includes) {
  String.prototype.includes = function (search, start) {
    'use strict'
    if (typeof start !== 'number') {
      start = 0
    }

    if (start + search.length > this.length) {
      return false
    } else {
      return this.indexOf(search, start) !== -1
    }
  }
}

// http://libux.co/useful-function-making-queryselectorall-like-jquery/
// need to update. if the query is for an ID, use querySelector() and return element itself, if the query is for a class, use querySelectorAll() and always return an array, even if there's only one item in it.

function _p (selector, context) {
  context = context || document
  var elementsArray
  if (selector.includes('#')) {
    elementsArray = Array.prototype.slice.call(context.querySelectorAll(selector))
    return elementsArray[0]
  } else if (selector.includes('.')) {
    elementsArray = Array.prototype.slice.call(context.querySelectorAll(selector))
    return elementsArray
  }
}

// thanks Sal
function mergeDefaults (obj, defaults, propList) {
  Object.assign(obj, defaults)
  Object.assign(obj, propList)
}

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// UI functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

// On click of element, the element with ID matching href is shown, the current visible element is hidden.
// This can be used two ways. Typically, it would be used to navigate between 'pages' of the game,
// but it could also be used to hide/reveal bits of information or interactions on the same page.
function next (anchor, currentVisible) {
  var current = _p(currentVisible)
  current.classList.add('hidden')
  var destination = _p(anchor).getAttribute('href').replace(/[^a-zA-Z 0-9]+/g, '')
  _p(next).classList.remove('hidden')
  e.preventDefault()
}

// To output a string to an HTML container
function printThing (info, wrapper) {
  if (wrapper.length > 1) {
    wrapper.forEach(function (element) {
      element.innerHTML = info
    })
  } else {
    wrapper.innerHTML = info
  }
}

// This will always output a <ul> with inner <li>s and insert them into the wrapper element
function printInventory (plastic, wrapper) {
  var printItems
  for (var i = 0, length = plastic.items.length; i < length; ++i) {
    printItems += '<li>' + plastic.items[i] + '</li>'
  }
  var printList = '<ul>' + printItems + '</ul>'
  wrapper.innerHTML(printList)
}

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// form element functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

// TODO: the form elements should be processed on click of submit

// TODO: could be handled with an array of elements?
function getInputVal (inputId) {
  return inputId.value
}

function checkRadio (radioArray) {
  for (var i = 0, length = radioArray.length; i < length; i++) {
    if (radioArray[i].checked) {
      return radioArray[i].value
    }
  }
}

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// Character functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

function Character (plastic, propList) {
  var defaults = {name: 'Character', currentQuest: 'none'}
  mergeDefaults(this, defaults, propList)
}

// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// inventory functions
// *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~

function Inventory (propList) {
  var defaults = {name: 'Default Inventory', min: 0, max: 100, updateSuccess: 'Item Added', updateFail: 'Inventory Full', removeSuccess: 'Item Removed', removeFail: 'Inventory Empty'}
  mergeDefaults(this, defaults, propList)
}

Inventory.prototype.addItem = function (plastic, newItem) {
  if (plastic.itemList.length < plastic.max) {
    plastic.itemList.push(newItem)
    return plastic.updateSuccess
  } else {
    return plastic.updateFail
  }
}

Inventory.prototype.subtractItem = function (plastic, removeItem) {
  var shorterArray
  for (var i = 0, listLength = plastic.itemList.length; i <= listLength; i++) {
    if (plastic.itemList[i] === removeItem) {
      shorterArray = plastic.itemlist.splice(plastic.itemlist[i], 1)
    }
  }
  if (shorterArray.length > plastic.min) {
    plastic.itemList = plastic.itemList.remove(removeItem)
    return plastic.removeSuccess
  } else {
    return plastic.removeFail
  }
}
/* eslint-enable no-unused-vars */
