

var immstruct = require('immstruct')
var Immutable = require('immutable')


// -- INITIAL ROOMS -------------------------------------------
var bridge = roomCreate("bridge")
bridge = roomAddDescription(bridge, [
  "Smashed control wheels are everywhere and wires hang dangerously. You see the bridge is in poor condition.", 
  ["The hallway is behind you","hall"],
])

bridge = roomAddObject(bridge, {name: "terminal", properties: ["broken"]})


var hall = roomCreate("hall")
hall = roomAddDescription(hall, [
  "Red lights flicker along a steel catwalk. Steam fills the room.",
  ["Some steps ascend to the bridge.","bridge"],
  ["To your left a hatch opens into the crew quarters","crewQuarters"],
  ["Behind you lies the engine room","engineRoom"],
])

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


// Connections are circular, define them last
bridge = roomAddConnection(bridge, hall)

hall = roomAddConnection(hall, bridge)
hall = roomAddConnection(hall, crewQuarters)
hall = roomAddConnection(hall, engineRoom)

crewQuarters = roomAddConnection(crewQuarters, hall)

engineRoom = roomAddConnection(engineRoom, hall)

// --------------------------------------------------------------

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


// -- GENERATE ROOMS ---------------------------------------------

function roomCreate(id) {
  return Immutable.fromJS({
    id: id,
    description: "",
    connections: {},
    objects: [],
  })
}

function roomAddDescription(room, description) {
  return room.set('description', Immutable.fromJS(description))
}

function roomAddObject(room, object) {
  return room.update('objects', (os) => os.push(Immutable.fromJS(object)))
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

// ------------------------------------------------------------------

module.exports = {
  rooms: roomsMap([bridge, hall, crewQuarters, engineRoom]),
  roomRawText: roomRawText
}

