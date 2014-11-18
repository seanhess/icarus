var Immutable = require('immutable')
var immstruct = require('immstruct')
var Ship = require('./ship')
var Events = require('./events/events')
var History = require('./history')

exports.initialState = function() {
  return Immutable.fromJS({
    location: Ship.rooms.get("crewQuarters"),
    detail: null, // the detail you are carefully looking at
  })
}

exports.turn = function(action, player) {
  return action(player)
}

exports.moveTo = function(roomId) {
  return function(player) {
    return player.set('location', Ship.rooms.get(roomId))
  }
}

exports.inspect = function(detail) {

  // inspect: who opens the terminal?
  // ... change, to not be isOpen, etc, but whether you have a proper terminal focused
  // and is not disabled, etc
  // need to render based on what happened
  // pass/fail?
  // IF WORKING: you can turn the knob (allowable action)
  // IF NOT WORKING AND TOOLS: you can fix it
  // IF NOT WORKING: nothing

  // is it a substate?
  // no, terminal open is a combination of multiple states

  return function(player) {
    return player.set('detail', detail)
  }
}

