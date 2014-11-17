
var Immutable = require('immutable')
var immstruct = require('immstruct')
var ship = require('./ship')

var player = immstruct({
  location: ship.getIn(["rooms", "crewQuarters"]),
})

exports.atom = player

exports.moveTo = function(roomId) {
  return player.cursor().update('location', function(l) {
    return ship.getIn(["rooms", roomId])
  })
}

