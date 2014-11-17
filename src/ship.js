

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
  description: "Smashed control wheels are everywhere and wires hang dangerously. You see the bridge is in poor condition. [The hallway is behind you.][hall]",
  connections: {},
})

var hall = Immutable.fromJS({
  id: "hall",
  description: "Red lights flicker along a steel catwalk. Steam fills the room. [Some steps ascend to the bridge.][bridge]. [To your left a hatch opens into the crew quarters][crewQuarters]. [Behind you lies the engine room][engineRoom]",
  connections: {},
})

var crewQuarters = Immutable.fromJS({
  id: "quarters",
  description: "Cryo tanks sit like blue pulsing tombs for the dead remains of your comrades. [The door behind you opens into the hall][hall]",
  connections: {},
})

var engineRoom = Immutable.fromJS({
  id: "engines",
  description: "The quantum reactor spins at speeds unimaginable. It's hot in here. [There is a door behind you.][hall]",
  connections: {}
})


function connectRoom(room, toRoom, properties) {
  return room.update("connections", (cns) => {
    var id = toRoom.get('id')
    return cns.set(id, {id: id})
  })
}

bridge = connectRoom(bridge, hall)

hall = connectRoom(hall, bridge)
hall = connectRoom(hall, crewQuarters)
hall = connectRoom(hall, engineRoom)

crewQuarters = connectRoom(crewQuarters, hall)

engineRoom = connectRoom(engineRoom, hall)

module.exports = Immutable.fromJS({
  rooms: {
    bridge: bridge,
    hall: hall,
    crewQuarters: crewQuarters,
    engineRoom: engineRoom
  }
})


//console.log("BRIDGE", bridge.toJS())
//console.log("HALL", hall.toJS())
//console.log("QU", crewQuarters.toJS())
//console.log("ENG", engineRoom.toJS())




  //connections: {
    //hall: { id: "hall" },
  //}

  //connections: {
    //bridge: {id: "bridge"},
    //crew:   {id: "quarters"},
    //engine: {id: "engines"},
  //}
