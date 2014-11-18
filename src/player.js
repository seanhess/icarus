
var Immutable = require('immutable')
var immstruct = require('immstruct')
var Ship = require('./ship')
var Events = require('./events/events')
var History = require('./history')

var player = immstruct({
  location: Ship.rooms.get("crewQuarters"),
})

exports.state = player

// moving = an action that causes stuff to happen
exports.moveTo = function(roomId) {

  // 1. advance time
  // 2. add clues
  // 3. update player location

  // save the old state to the history yo
  History.save(Events.currentTime(), player.cursor())

  // it takes time... how to mark it?
  Events.turnPassed()
  //Villain.takeTurn()

  return player.cursor().update('location', function(l) {
    return Ship.rooms.get(roomId)
  })
}

// hyperlinks room: move to room
// hyperlinks object: inspect an element
