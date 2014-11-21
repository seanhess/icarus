var immstruct = require('immstruct')
var Immutable = require('immutable')
var cuid = require('cuid')

var construction = require('./construction')

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

// the quick name for a detail
function detailName(detail) {
  if (!detail) return ""
  var adjectives = detail.get('properties').map(propertyName).toArray().join(", ")
  return "a " + adjectives + " " + detail.get('name')
}

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

function propertyName(prop) {
  return prop.get('name')
}

function detailIsEnabled(detail) {
  if (!detail) return false
  // if properties are none of: broken, locked, disabled, etc :)
  var badProps = detail.get('properties').filter(function(prop) {
    var name = prop.get('name')
    return name == "broken" || name == "disabled" || name == "locked"
  })

  return badProps.count() === 0
}

function detailIsBroken(detail) {
  if (!detail) return false
  return detail.get('properties').filter((p) => p.get('name') == "broken").count() > 0
}


// ------------------------------------------------------------------


exports.rooms = rooms
exports.portCryo = rooms.get("portCryo")
exports.roomRawText = roomRawText
exports.roomById = roomById
exports.detailName = detailName
exports.detailIsEnabled = detailIsEnabled
exports.detailIndex = detailIndex
exports.Broken = construction.Broken  // note, this returns json. may need to wrap in immutable.
exports.detailById = detailById
exports.detailIsBroken = detailIsBroken

// ------------------------------------------------------------------



