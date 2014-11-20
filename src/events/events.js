var Immutable = require('immutable')
var immstruct = require('immstruct')
var moment = require('moment')

var START_TIME = exports.START_TIME = moment("2084-11-14T02:14Z")
var TURN_DURATION = exports.TURN_DURATION = 60

var events = immstruct({
  // roughly 2084
  time: START_TIME,
  turn: 0
})

function cursor() {
  return events.cursor()
}

exports.state = events

exports.turnPassed = function() {
  exports.timePassed(TURN_DURATION)
  events.cursor('turn').update((t) => t+1)
}

exports.timePassed = function(dt) {
  // I need to tell the villain that time passed
  // I could use a channel here that he can subscribe to?
  // he needs to observe me somehow
  // channels are CONSUMED though, right?
  events.cursor('time').update((t) => t.add(dt, 's'))
}

exports.renderTime = function(time) {
  return time.format("HH:mm")
  //return time.format("ddd YYYY/MM/DD HH:mm:ss")
}

exports.currentTime = function() {
  return events.cursor().get('time')
}

// things that happen over time, that you might notice
// the parts that you would notice

// Someone turns on the engines, you hear them turn on
// Bad guy walk past in a room near you, you hear the footsteps
// Doors opening and closing
// Breaking something
// Creaking / breaking sounds
// Warmer?
// Shaking



// Take actions that take time, a duration associated with each action
// -> cause effects
// -> change where you are
// -> causes time to pass
// -> generate a clue / hint

// 1. Movement -> advance the clock
// 2. Accessing the terminal -> advances the clock
// 3. Bad Guy moving around
// 4. 


