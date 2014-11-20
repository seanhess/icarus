var Immutable = require('immutable')
var immstruct = require('immstruct')
var moment = require('moment')

var Player = require('./player')
var Ship = require('./ship')
var Events = require('./events/events')
var Villain = require('./villain')
var History = require('./history')

var START_TIME = moment("2084-11-14T02:14Z")
var TURN_DURATION = 60
var csp = require("js-csp");


var state   = exports.state   = immstruct(initialState())
var actions = exports.actions = csp.chan()

csp.go(function* () {
  while (true) {
    var action = yield csp.take(actions)
    runTick(action)
  }
})

exports.onAction = function(action) {
  return function() {
    csp.putAsync(actions, action)
  }
}

// this file is the glue, has references to all the others?
function initialState() {
  return Immutable.Map({
    turn: 0,
    time: START_TIME,
    player: Player.initialState(),
    villain: Villain.initialState(),
    rooms: Ship.rooms,
  })
}

// so now everyone can update and be happy
function tick(playerAction, state) {
  var nextTurn = state.get('turn') + 1
  var nextTime = state.get('time').clone().add(TURN_DURATION*1000)

  var newState = state
    .update(playerAction)
    .update(Villain.turn)

  return newState.merge({
    turn: nextTurn,
    time: nextTime,
  })
}

function runTick(playerAction) {

  var state = exports.state.cursor()
  console.log("Run Tick", state.get('turn')+1)

  History.save(state)

  state.update(function(oldState) {
    return tick(playerAction, oldState)
  })
}
