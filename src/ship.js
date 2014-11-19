var immstruct = require('immstruct')
var Immutable = require('immutable')
var cuid = require('cuid')


// -- INITIAL ROOMS -------------------------------------------
var bridge = roomCreate("bridge")
bridge = roomAddDescription(bridge, [
  "Smashed control wheels are everywhere and wires hang dangerously. You see the bridge is in poor condition.", 
  ["The hallway is behind you","hall"],
])

bridge = roomAddDetail(bridge, Terminal(null, [Broken()]))

var hall = roomCreate("hall")
hall = roomAddDescription(hall, [
  "Red lights flicker along a steel catwalk. Steam fills the room.",
  ["Some steps ascend to the bridge.","bridge"],
  ["To your left a hatch opens into the crew quarters","crewQuarters"],
  ["Behind you lies the engine room","engineRoom"],
])
//hall = roomAddObject(hall, {
  //name: "some twisted metal",
  //description: "",
//})

var crewQuarters = roomCreate("crewQuarters")
crewQuarters = roomAddDescription(crewQuarters, [
  "Cryo tanks sit like blue pulsing tombs for the dead remains of your comrades.",
  ["The door behind you opens into the hall", "hall"],
])

var engineRoom = roomCreate("engineRoom")
engineRoom = roomAddDescription(engineRoom, [
  "The quantum reactor spins at speeds unimaginable. It's hot in here.",
  ["There is a door behind you.","hall"],
])
engineRoom = roomAddDetail(engineRoom, Terminal(null, []))


// Connections are circular, define them last
bridge = roomAddConnection(bridge, hall)

hall = roomAddConnection(hall, bridge)
hall = roomAddConnection(hall, crewQuarters)
hall = roomAddConnection(hall, engineRoom)

crewQuarters = roomAddConnection(crewQuarters, hall)

engineRoom = roomAddConnection(engineRoom, hall)

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

exports.roomById = function(state, id) {
  return state.getIn(["rooms", id])
}


// -- GENERATE ROOMS ---------------------------------------------

function roomCreate(id) {
  return Immutable.fromJS({
    id: id,
    description: "",
    connections: {},
    details: {},
  })
}

function roomAddDescription(room, description) {
  return room.set('description', Immutable.fromJS(description))
}

function roomAddDetail(room, obj) {
  var id = room.get('id') + " " + obj.get('name')
  var detail = Immutable.fromJS(obj).set('id', id)
  return room.update('details', (ds) => ds.set(id, detail))
}

function roomAddConnection(room, toRoom, properties) {
  return room.update("connections", (cns) => {
    var id = toRoom.get('id')
    return cns.set(id, {id: id})
  })
}

function roomsMap(rooms) {
  return Immutable.Map(rooms.reduce(function(rooms, room) {
    rooms[room.get('id')] = room
    return rooms
  }, {}))
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

function Terminal(name, properties) {
  return Detail("terminal", name, properties)
}

function Detail(type, name, properties) {
  return Immutable.fromJS({
    type: type, // terminal
    name: name || type, // terminal
    properties: properties || [] // like broken
  })
}

// the quick name for a detail
function detailName(detail) {
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


// Ok, these all MEAN something in the game
// it's the description that changes things
// this is all stuff you would notice at first glance
function Broken(description) {
  return Property("broken", description || "broken")
}

function Disabled(description) {
  return Property("disabled", description || "disabled")
}

function Locked(description) {
  return Property("locked", description || "locked")
}

function Property(name, description) {
  return Immutable.fromJS({
    name: name,
    description: description
  })
}

function propertyName(prop) {
  return prop.get('name')
}

function detailIsEnabled(detail) {
  // if properties are none of: broken, locked, disabled, etc :)
  var badProps = detail.get('properties').filter(function(prop) {
    var name = prop.get('name')
    return name == "broken" || name == "disabled" || name == "locked"
  })

  return badProps.count() === 0
}

function detailIsBroken(detail) {
  return detail.get('properties').filter((p) => p.get('name') == "broken").count() > 0
}

 //given a detail, provide
//function focusOptions(detail) {
  //return ["Look Around"]
//}

// ------------------------------------------------------------------


exports.rooms = roomsMap([bridge, hall, crewQuarters, engineRoom]),
exports.roomRawText = roomRawText
exports.detailName = detailName
exports.detailIsEnabled = detailIsEnabled
exports.detailIndex = detailIndex
exports.Broken = Broken
exports.detailById = detailById
exports.detailIsBroken = detailIsBroken

// ------------------------------------------------------------------



