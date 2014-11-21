var immstruct = require('immstruct')
var Immutable = require('immutable')
var cuid = require('cuid')

var construction = require('./construction')
var {TERMINAL, BROKEN, DISABLED, LOCKED} = require('./construction')

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

// -- DETAILS -------------------------------------------------------

function detailEquals(d1, d2) {
  return d1.get('id') == d2.get('id')
}

function detailIndex(details, detail) {
  var index = details.findIndex(function(d) {
    return detailEquals(d, detail)
  })
  if (index < 0) throw new Error("Could not find detail: ", currentDetail)
  return index
}

function detailById(room, detailId) {
  return room.get('details').find(function(d) {
    return d.get('id') == detailId
  })
}

// -- PROPERTIES ----------------------------------------
// set to true or false. it means they CAN be changed
// broken: false
// disabled: false
// locked: false

var BROKEN = "broken"
var DISABLED = "disabled"
var LOCKED = "locked"

// oh but they need a name too?
// but isn't that a condition of rendering?
// we don't really want to define them by hand right now

function detailIsEnabled(detail) {
  if (!detail) return false

  var props = detail.get('properties')
  return !(props.get(BROKEN) || props.get(DISABLED) || props.get(LOCKED))
}

function detailIsBroken(detail) {
  if (!detail) return false
  return detail.get(BROKEN)
}


// ------------------------------------------------------------------


exports.rooms = rooms
exports.roomRawText = roomRawText
exports.roomById = roomById
exports.portCryo = rooms.get("portCryo")
exports.detailIsEnabled = detailIsEnabled
exports.detailIndex = detailIndex
exports.detailById = detailById
exports.detailIsBroken = detailIsBroken
exports.TERMINAL = TERMINAL
exports.BROKEN = BROKEN
exports.DISABLED = DISABLED
exports.LOCKED = LOCKED

// ------------------------------------------------------------------



