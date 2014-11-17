
var Immutable = require('immutable')
var ship = require('./ship')

var player = Immutable.fromJS({
  location: ship.getIn(["rooms", "crewQuarters"]),
})

console.log("PLAYER", player.toJS())
