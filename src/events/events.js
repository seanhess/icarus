var Immutable = require('immutable')
var moment = require('moment')

var START_TIME = moment("2084-11-14T02:14Z")
var TURN_DURATION = 60

exports.initialState = function() {
  return Immutable.Map({
    turn: 0,
    time: START_TIME,
    ending: null,
    distanceToSunDoom: 20,
  })
}

// TODO calculate actual acceleration and thrust of ship for death
exports.turn = function({events}) {

  var newDistance = events.get('distanceToSunDoom') - 1

  events.update(function(e) {
    return e
      .update('turn', t => t + 1)
      .update('time', t => t.clone().add(TURN_DURATION*1000))
      .set('distanceToSunDoom', newDistance)
  })

  if (newDistance <= 0) {
    events.set('ending', SUN_DOOM)
  }
}

var SUN_DOOM = "A light on the terminal near you blinks frantically. The message from the computer is short, but clear: \"We are caught in the sun's pull. It's too late.\". The adrenaline that drove you up to this point dries up, leaving you exhausted. You make your way to a small round window, and see the sun fly past, larger and larger each moment. Your last thoughts are that it has become too bright, and too warm, when your eyes seem too heavy and you sleep."

exports.renderTime = function(time) {
  return time.format("HH:mm")
  //return time.format("ddd YYYY/MM/DD HH:mm:ss")
}
