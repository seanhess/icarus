

var immstruct = require('immstruct')
var Immutable = require('immutable')


//var ship = immstruct({
  //rooms: [
    //bridge,
    //description,
    //crewQuarters,
    //engineRoom
  //]
//})

var bridge = Immutable.fromJS({
  id: "bridge",
  description: [
    "Smashed control wheels are everywhere and wires hang dangerously. You see the bridge is in poor condition.", 
    ["The hallway is behind you","hall"],
  ],
  connections: {},
})

var hall = Immutable.fromJS({
  id: "hall",
  description: [
    "Red lights flicker along a steel catwalk. Steam fills the room.",
    ["Some steps ascend to the bridge.","bridge"],
    ["To your left a hatch opens into the crew quarters","crewQuarters"],
    ["Behind you lies the engine room","engineRoom"],
  ],
  connections: {},
})


var crewQuarters = Immutable.fromJS({
  id: "crewQuarters",
  description: [
    "Cryo tanks sit like blue pulsing tombs for the dead remains of your comrades.",
    ["The door behind you opens into the hall", "hall"],
  ],
  connections: {},
})

var engineRoom = Immutable.fromJS({
  id: "engineRoom",
  description: [
    "The quantum reactor spins at speeds unimaginable. It's hot in here.",
    ["There is a door behind you.","hall"],
  ],
  connections: {}
})


function connectRoom(room, toRoom, properties) {
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

bridge = connectRoom(bridge, hall)

hall = connectRoom(hall, bridge)
hall = connectRoom(hall, crewQuarters)
hall = connectRoom(hall, engineRoom)

crewQuarters = connectRoom(crewQuarters, hall)

engineRoom = connectRoom(engineRoom, hall)

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

module.exports = {
  rooms: roomsMap([bridge, hall, crewQuarters, engineRoom]),
  roomRawText: roomRawText
}

