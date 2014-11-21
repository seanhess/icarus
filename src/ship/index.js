var immstruct = require('immstruct')
var Immutable = require('immutable')
var cuid = require('cuid')

var construction = require('./construction')
var {TERMINAL, BROKEN, DISABLED, LOCKED} = require('./details')
var {find} = require('lodash')

// -- INITIAL ROOMS -------------------------------------------

var rooms = Immutable.fromJS(construction.rooms)


// -- ROOMS ------------------------------------------------------

function roomRawText(room) {
  return room.get('description').toJS().map(function(line) {
    if (Array.isArray(line)) {
      return line[0]
    }
    else {
      return line
    }
  }).join(" ")
}

function roomById(state, id) {
  return state.getIn(["rooms", id])
}

// ------------------------------------------------------------------


exports.rooms = rooms
exports.roomRawText = roomRawText
exports.roomById = roomById
exports.portCryo = rooms.get("portCryo")

// ------------------------------------------------------------------



