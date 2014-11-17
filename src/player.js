
var Immutable = require('immutable')
var ship = require('./ship')

var player = Immutable.fromJS({
  location: ship.getIn(["rooms", "crewQuarters"]),
})

module.exports = player
console.log("PLAYER", player.toJS())
