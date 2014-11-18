var Immutable = require('immutable')
var immstruct = require('immstruct')
var moment = require('moment')

var events = immstruct({
  // roughly 2084
  time: moment("2084-11-14T02:14Z")
})

function cursor() {
  return events.cursor()
}

exports.state = events

exports.timePassed = function(dt) {
  events.cursor('time').update((t) => t.add(dt, 's'))
}

exports.renderTime = function(time) {
  return time.format("ddd YYYY/MM/DD HH:mm:ss")
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



