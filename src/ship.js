var immstruct = require('immstruct')
var Immutable = require('immutable')
var cuid = require('cuid')


// -- INITIAL ROOMS -------------------------------------------
var bridge = roomCreate("bridge", "Bridge")
bridge = roomAddDescription(bridge, "Smashed control wheels are everywhere and wires hang dangerously. You see the bridge is in poor condition.")
bridge = roomAddDetail(bridge, Terminal({broken: true}))

console.log("BRIDGE", bridge.toJS())

var hall = roomCreate("hall", "Hallway")
hall = roomAddDescription(hall, "Red lights flicker along a steel catwalk. Steam fills the room.")
//hall = roomAddObject(hall, {
  //name: "some twisted metal",
  //description: "",
//})

var crewQuarters = roomCreate("crewQuarters", "Crew Quarters")
crewQuarters = roomAddDescription(crewQuarters, "Cryo tanks sit like blue pulsing tombs for the dead remains of your comrades.")
exports.crewQuarters = crewQuarters

var engineRoom = roomCreate("engineRoom", "Engine Room")
engineRoom = roomAddDescription(engineRoom, "The quantum reactor spins at speeds unimaginable. It's hot in here.")
engineRoom = roomAddDetail(engineRoom, Terminal({broken: false}))
engineRoom = roomAddDetail(engineRoom, Detail("engine", "engine", {disabled: true, broken: false}))
engineRoom = roomAddDetail(engineRoom, Detail("pile", "pile of rubble", {}))

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

function roomCreate(id, name) {
  return Immutable.fromJS({
    id: id,
    name: name,
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
    return cns.set(id, {
      id: id, 
      name: toRoom.get('name')
    })
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

var TERMINAL = "terminal"

function Terminal(properties) {
  return Detail("terminal", "terminal", properties)
}

function Detail(type, name, properties) {
  return Immutable.fromJS({
    type: type, // terminal
    name: name || type, // terminal
    properties: properties || {} // like broken
  })
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

 //given a detail, provide
//function focusOptions(detail) {
  //return ["Look Around"]
//}

// ------------------------------------------------------------------


exports.rooms = roomsMap([bridge, hall, crewQuarters, engineRoom]),
exports.roomRawText = roomRawText
exports.detailIsEnabled = detailIsEnabled
exports.detailIndex = detailIndex
exports.detailById = detailById
exports.detailIsBroken = detailIsBroken
exports.TERMINAL = TERMINAL
exports.BROKEN = BROKEN
exports.DISABLED = DISABLED
exports.LOCKED = LOCKED

// ------------------------------------------------------------------



