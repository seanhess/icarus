var Immutable = require('immutable')
var immstruct = require('immstruct')
var Ship = require('./ship')
var Events = require('./events/events')
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
  return function({player}) {
    player.set('room', roomId)
  }
}

exports.inspect = function(detail) {
  return function({player}) {
    player.set('detail', detail.get('id'))
  }
}

exports.lookAround = function() {
  return function({player}) {
    player.set('detail', null)
  }
}

// I want to have the detail passed to me, but I need to know which one it was?
// hmm... 
exports.detailFix = function() {
  return function({detail}) {
    detail.set('properties', Immutable.List([]))
  }
}

exports.detailBreak = function() {
  return function({detail}) {
    detail.update('properties', ds => ds.push(Ship.Broken()))
  }
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
