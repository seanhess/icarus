
var Immutable = require('immutable')
var immstruct = require('immstruct')
var Ship = require('./ship')
var Events = require('./events/events')
var History = require('./history')

var villain = immstruct({
  location: Ship.rooms.get("bridge"),
  action: {
    time: Events.START_TIME.add(120),
    room: Ship.rooms.get("hall"),
  }
})

// give him a starting goal

exports.state = villain


exports.isSeen = function(player) {
  return player.getIn(['location', 'id']) == villain.cursor('location').get('id')
}

// how to handle time... he makes a move?
// he has an action that will happen at a certain time
// as soon as it happens, he does it
// no, you sort of re-evaluate his actions based on the state, right?
// so what do you need?
// I need to know the last time he did an action
// what he is DOING right now. There's a duration
// if he has a goal

// I need a better model...

function moveTo(room) {
  return function(l) {
    return Ship.rooms.get(room)
  }
}

exports.timePassed = function(currentTime) {
  var action = villain.cursor('action')
  if (currentTime.diff(action.get('time')) > 0) {
    // so do it!
    villain.cursor('location').update(moveTo(action.get('room')))
  }
}
