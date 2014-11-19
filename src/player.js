var Immutable = require('immutable')
var immstruct = require('immstruct')
var Ship = require('./ship')
var Events = require('./events/events')
var History = require('./history')
var {curry} = require('lodash')

exports.initialState = function() {
  return Immutable.fromJS({
    room: Ship.crewQuarters.get('id'),
    detail: null, // the detail you are carefully looking at
  })
}

// -- ACTIONS -------------------------------------------------

// every action is a function that takes the state and returns the modified state

exports.moveTo = function(roomId) {
  return function(state) {
    return state.setIn(['player','room'], roomId)
  }
}

exports.inspect = function(detail) {
  return function(state) {
    return state.setIn(['player','detail'], detail.get('id'))
  }
}

exports.lookAround = function() {
  return function(state) {
    return state.setIn(['player','detail'], null)
  }
}

// I want to have the detail passed to me, but I need to know which one it was?
// hmm... 
exports.detailFix = function() {
  return function(state) {
    return state.updateIn(detailKeyPath(state), function(detail) {
      return detail.set('properties', Immutable.List([]))
    })
  }
}

exports.detailBreak = function() {
  return function(state) {
    return state.updateIn(detailKeyPath(state), function(detail) {
      return detail.update('properties', function(ds) {
        return ds.push(Ship.Broken())
      })
    })
  }
}


function roomKeyPath(state) {
  var roomId = state.getIn(['player', 'room'])
  return ['rooms', roomId]
}

function detailKeyPath(state) {
  var roomId = state.getIn(['player', 'room'])
  var detailId = state.getIn(['player', 'detail'])
  return ['rooms', roomId, 'details', detailId]
}

// -- QUERY ------------------------------------------------------------

exports.playerDetail = function(game, player) {
  var detailId = player.get('detail')
  var room = Ship.roomById(game, player.get('room'))
  if (!detailId) return null
  return Ship.detailById(room, player.get('detail'))
}

exports.playerRoom = function(game, player) {
  return Ship.roomById(game, player.get('room'))
}
