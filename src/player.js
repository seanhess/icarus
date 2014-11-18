
var Immutable = require('immutable')
var immstruct = require('immstruct')
var ship = require('./ship')
var Events = require('./events/events')

var player = immstruct({
  location: ship.getIn(["rooms", "crewQuarters"]),
})

exports.state = player

// moving = an action that causes stuff to happen
exports.moveTo = function(roomId) {

  // 1. advance time
  // 2. add clues
  // 3. update player location

  // it takes time... how to mark it?
  Events.timePassed(60)

  return player.cursor().update('location', function(l) {
    return ship.getIn(["rooms", roomId])
  })
}

// hyperlinks room: move to room
// hyperlinks object: inspect an element
