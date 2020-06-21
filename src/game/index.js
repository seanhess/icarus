var Immutable = require('immutable')
var Cursor    = require('immutable/contrib/cursor')
var immstruct = require('immstruct')

var Player  = require('./player')
var Ship    = require('../ship')
var Events  = require('./events')
var Villain = require('./villain')
var History = require('./history')
var Systems = require('./systems')

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
    exports.putAction(action)
  }
}

exports.putAction = function(action) {
  csp.putAsync(actions, action)
}

exports.showFeedback = function(message) {
  exports.state.cursor('feedback').update(() => message)
}

// this file is the glue, has references to all the others?
function initialState() {
  return Immutable.Map({
    player:    Player.initialState(),
    villain:   Villain.initialState(),
    rooms:     Ship.rooms,
    events:    Events.initialState(),
    systems:   Systems.initialState(),
    feedback:  "",
  })
}

// so now everyone can update and be happy
function tick(playerAction, state) {

  console.log("Run Tick", state.getIn(['events','turn'])+1)

  var next = runState(state, function(state) {
    var cursors = tickCursors(state)
    state.cursor('feedback').update(() => "")
    playerAction(cursors)
    Events.turn(cursors)
    Villain.turn(cursors)
  })

  var checked = runState(next, function(state) {
    Events.checkGame(tickCursors(state))
  })

  return checked
}

function runState(state, f) {
  var nextState = state
  var cursor = Cursor.from(nextState, [], function(newValue, oldValue, keyPath) {
    nextState = nextState.setIn(keyPath, newValue.getIn(keyPath))
  })

  f(cursor)

  return nextState
}

function tickCursors(state) {
  return {
    player:   state.cursor('player'),
    villain:  state.cursor('villain'),
    events:   state.cursor('events'),
    detail:   state.cursor(detailKeyPath(state)),
    room:     state.cursor(roomKeyPath(state)),
    game:     state
  }
}

function runTick(playerAction) {
  var state = exports.state.cursor().deref()
  History.save(state)
  var nextState = tick(playerAction, state)
  exports.state.cursor().update(() => nextState)
}

function roomKeyPath(game) {
  var roomId = game.getIn(['player', 'room'])
  return ['rooms', roomId]
}

function detailKeyPath(game) {
  var roomId = game.getIn(['player', 'room'])
  var detailId = game.getIn(['player', 'detail'])
  return ['rooms', roomId, 'details', detailId]
}
