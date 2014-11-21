var Immutable = require('immutable')
var immstruct = require('immstruct')

var Player = require('./player')
var Ship = require('../ship')
var Events = require('./events')
var Villain = require('./villain')
var History = require('./history')

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
    player: Player.initialState(),
    villain: Villain.initialState(),
    rooms: Ship.rooms,
    events: Events.initialState(),
  })
}

// so now everyone can update and be happy
function tick(playerAction, state) {

  console.log("Run Tick", state.get(['events','turn'])+1)
  
  var cursors = {
    player:  state.cursor('player'),
    villain: state.cursor('villain'),
    events:  state.cursor('events'),
    detail:  state.cursor(detailKeyPath(state)),
    room:    state.cursor(roomKeyPath(state)),
    game:    state
  }

  Events.turn(cursors)
  playerAction(cursors)
  Villain.turn(cursors)
}

function runTick(playerAction) {

  var state = exports.state.cursor()

  History.save(state)

  tick(playerAction, state)
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
