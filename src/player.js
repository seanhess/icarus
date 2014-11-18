
var Immutable = require('immutable')
var immstruct = require('immstruct')
var Ship = require('./ship')
var Events = require('./events/events')
var History = require('./history')

exports.initialState = function() {
  return Immutable.fromJS({
    location: Ship.rooms.get("crewQuarters"),
  })
}

exports.turn = function(action, player) {
  return action(player)
}

// creates an action :)
exports.moveTo = function(roomId) {

  return function(player) {
    return player.update('location', function(l) {
      return Ship.rooms.get(roomId)
    }) 
  }

  // 1. advance time
  // 2. add clues
  // 3. update player location

   //save the old state to the history yo

   //it takes time... how to mark it?
  //Events.turnPassed()
  //Villain.takeTurn()

}

// hyperlinks room: move to room
// hyperlinks object: inspect an element
