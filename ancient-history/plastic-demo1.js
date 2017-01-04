/* global Plastic, Inventory, _p, getInputVal, checkRadio, printThing, next, chosenThing */
document.addEventListener('DOMContentLoaded', function () {
  var plastic = new Plastic({})
  var state = {}

  function Character (plastic, charProperties) {
    Character.call(this, plastic, charProperties)
  }

  function Items (plastic, itemProperties) {
    Inventory.call(this, plastic, itemProperties)
  }

  Character.prototype = Object.create(Character.prototype)
  Items.prototype = Object.create(Inventory.prototype)

  function getStarted (plastic) {
    // todo: this goes into an inifinte loop
    // SAVE ME JAVASCRIPT DAD
    plastic.character = new Character(plastic)

    plastic.chosenName = getInputVal(_p('#newName'))

    // todo: this doesn't work because _p returns an array
    state.chosenQuest = checkRadio(_p('#questpicker1 input'))

    // todo: these don't work because _p returns an array
    _p('.charname').forEach(function (element) {
      printThing(plastic.chosenName, element)
    })

    _p('.questname').forEach(function (element) {
      printThing(plastic.chosenQuest, element)
    })

    plastic.itemList = ['thing one', 'thing two', 'thing three']

    state.items = new Items(plastic, {name: 'Inventory', min: 0, max: 10, autorenew: false, itemList: plastic.itemList, addSuccess: 'It added', addFail: 'It didn\t add', removeSuccess: 'It removed', removeFail: 'It didn\'t remove'})

    // todo: fix this
    // plastic.printInventory(state.items.itemList, _p('#itemListWrapper'))

    next('#newChar', '#start')
  }

  function step3 (plastic) {
    plastic.things = document.getElementsByName('newQuestItem')
    plastic.chosenThing = checkRadio(plastic.things)
    state.items.addItem(chosenThing)
    state.items.printInventory()
  }

  _p('#newChar').addEventListener('click', function (e) {
    getStarted(plastic)
  })

  _p('#addQuestItem').addEventListener('click', function (e) {
    step3(plastic)
  })
})
