var immstruct = require('immstruct')
var Immutable = require('immutable')
var cuid = require('cuid')

var construction = require('./construction')
var {TERMINAL, BROKEN, DISABLED, LOCKED} = require('./details')

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
// Details can be
//  broken
//  disabled
//  we need a way to describe them differently depending on this stuff
//  terminals can be unplugged
//  data banks can be removed (find them and put them back)

//  properties can be enabled or disabled
//  they either contribute to the description or they don't
//  change the properties and the description changes!


// TYPES OF DETAILS
// -- terminals
//    pipes with blood on them
//    tool: hydrospanner
//    broken robot
//    a lead pipe
//    a knife
//    a blaster
//    data disks / banks / memory sticks
//    motion sensors
//    engine coolant valve
//    "A terminal is glowing" -- special case!
//    "A hyrdospanner with a cracked screen"

// can you pick this thing up?
// it depends on what it is. what happens when you click it?

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

// Ok, these all MEAN something in the game
// it's the description that changes things
// this is all stuff you would notice at first glance

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

// ------------------------------------------------------------------



