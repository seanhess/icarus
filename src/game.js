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
  
  // try using cursors instead to make this easier
  state.update('turn', t => t + 1)
  state.update('time', t => t.clone().add(TURN_DURATION*1000))

  var cursors = {
    player:  state.cursor('player'),
    villain: state.cursor('villain'),
    detail:  state.cursor(detailKeyPath(state)),
    room:    state.cursor(roomKeyPath(state)),
    game:    state
  }

  playerAction(cursors)
  Villain.turn(cursors)
}

function runTick(playerAction) {

  var state = exports.state.cursor()
  console.log("Run Tick", state.get('turn')+1)

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
