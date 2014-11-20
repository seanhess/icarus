var immstruct = require('immstruct')
var Immutable = require('immutable')
var cuid = require('cuid')


// -- INITIAL ROOMS -------------------------------------------
var bridge = roomCreate("bridge", "Bridge")
bridge = roomAddDescription(bridge, "Smashed control wheels are everywhere and wires hang dangerously. You see the bridge is in poor condition.")
bridge = roomAddDetail(bridge, Terminal(null, [Broken()]))

var hall = roomCreate("hall", "Hallway")
hall = roomAddDescription(hall, "Red lights flicker along a steel catwalk. Steam fills the room.")
//hall = roomAddObject(hall, {
  //name: "some twisted metal",
  //description: "",
//})

var crewQuarters = roomCreate("crewQuarters", "Crew Quarters")
crewQuarters = roomAddDescription(crewQuarters, "Cryo tanks sit like blue pulsing tombs for the dead remains of your comrades.")

var engineRoom = roomCreate("engineRoom", "Engine Room")
engineRoom = roomAddDescription(engineRoom, "The quantum reactor spins at speeds unimaginable. It's hot in here.")
engineRoom = roomAddDetail(engineRoom, Terminal(null, []))

// Connections are circular, define them last
bridge = roomAddConnection(bridge, hall)

hall = roomAddConnection(hall, bridge)
hall = roomAddConnection(hall, crewQuarters)
hall = roomAddConnection(hall, engineRoom)

crewQuarters = roomAddConnection(crewQuarters, hall)

engineRoom = roomAddConnection(engineRoom, hall)


// ORBITER //

var orbiterStorage = mutRoomCreate("orbiterStorage", "Orbiter Storage",
      "This room is filled with everything a man could need during his months in space."+
      "The shelves are stocked with food, clothing, toiletries, spare parts, and many other"+
      "things stored in airtight containers without labels.  Why isn’t anything labeled??"+ 
      "On each end of the room, an airlock leads to another section of the orbiter."+
      "At least the doors are labeled!  A ladder leads upward as well, toward the center.")

var orbiterMess = mutRoomCreate("orbiterMess", "Orbiter Mess",
      "You see a small room, divided equally between seating and food preparation.  Only a few"+
      "chairs are attached to the table, and the kitchen - if you can even call it that, it looks"+
      "more like a food-rehydration station - could only prepare food for a small number of people."+
      "An airlock leads from one end of the room, a normal door from the other.")

var orbiterQuarters = mutRoomCreate("orbiterQuarters", "Orbiter Quarters",
      "A narrow hallway runs the length of this section, the upward curve of the floor clearly visible"+
      "along its length.  Two doors stand on each side of the hallway, leading into small rooms."+
      "There is an airlock door at the each end of the hallway, and a ladder in the center of the hall"+
      "leading upward to the center.")

var orbiterRecreation = mutRoomCreate("orbiterRecreation", "Orbiter Recreation",
      "A treadmill, a stationary bike, a couch with a television, and a one-man ping-pong table - that’s about"+
      "all that they managed to cram into this recreation center. Doors lead from the room on either end, and along"+
      "one wall a ladder leads upward to a hatch in the ceiling.")

var observationDeck = mutRoomCreate("observationDeck", "Observation Deck",
      "Glass floor, walls, ceiling - who thought this was a good idea?  Vertigo strikes you for a moment as you seem"+
      "to be suddenly standing in the midst of space, with only the walls at either end lending reality to your"+
      "circumstance.  A few comfortable chairs lie in the center of the room. There is a door in each wall at the"+
      "ends of the room.")

var orbiterMedical = mutRoomCreate("orbiterMedical", "Orbiter Medical",
      "You stand in a small medical center, obviously only capable of caring for one person at a time.  Although"+
      "there are some medical supplies in cabinets along the walls, the majority of the room is given to an examination"+
      "bed with a robotic arm hovering over it. In one end of the room, an airlock leads to another section, with a normal"+
      "door opposite.")

var orbiterBridge = mutRoomCreate("orbiterBridge", "Orbiter Bridge",
      "An entire corner of the room is taken up by large databanks, secured behind reinforced steel.  The rest of the room"+
      "is given over to various workstations, all covered with many switches and buttons and blinking lights.  The chairs"+
      "at the stations look comfortable, capable of helping you get through many hours of work. Both ends of the room hold"+ 
      "airlock doors, and a ladder leads upward toward an airlock hatch.")

mutBiconnect(orbiterQuarters, orbiterStorage)

mutBiconnect(orbiterStorage, orbiterBridge)

mutBiconnect(orbiterBridge, orbiterMedical)

mutBiconnect(orbiterMedical, observationDeck)

mutBiconnect(observationDeck, orbiterRecreation)

mutBiconnect(orbiterRecreation, orbiterMess)

mutBiconnect(orbiterMess, orbiterQuarters)


// LANDER BOTTOM //

var landerMess = mutRoomCreate("landerMess", "Lander Mess",
      "Great, a cafeteria.  How do they manage to all look the same?  Most of the space is filled with tables, bolted"+
      "to the floor with benches as their sides.  Tucked into the nose of the ship is a small kitchen, including fridge"+
      "and freezer, stove, and serving counters. Against the aft wall of the room is a ladder leading upward, and in"+
      "that same wall there are three doors, in the center, port, and starboard.")

var starboardLanderQuarters = mutRoomCreate("starboardLanderQuarters", "Starboard Lander Quarters",
      "You are in a long hallway leading from bow to stern.  On both sides of the hallway, doors line the walls leading"+
      "to individual crew rooms.  Another short hallway cuts across the center of the main hall.  Each hallway has a door"+
      "at both ends.")

var engineering = mutRoomCreate("engineering", "Engineering",
      "You stand in the center of a veritable jungle of pipes, wires, screens, and computer terminals.  A large section of"+
      "the room is walled off into its own chamber with radiation warnings on the door.  Several large tanks with hazardous"+
      "materials signs stand clustered in one corner. There are three doors along the fore wall: port, center, and aft."+
      "Next to the center door you see a ladder leading upward. There are several computer access terminals among the more"+
      "esoteric control stations.")

var portLanderQuarters = mutRoomCreate("portLanderQuarters", "Port Lander Quarters",
      "You are in a long hallway leading from bow to stern.  On both sides of the hallway, doors line the walls leading"+
      "to individual crew rooms.  Another short hallway cuts across the center of the main hall.  Each hallway has a door"+
      "at both ends.  There is a small personnel elevator at the fore end of the hallway, on the starboard side.")

var cargoHold = mutRoomCreate("cargoHold", "Cargo Hold",
      "You stand in a large cargo hold, filled to the brim with equipment and supplies.  Along the walls and in the center"+
      "of the room, floor-to-ceiling shelves are stuffed with hermetically sealed plastic bins holding who knows what."+
      "In between the shelves lie vehicles and large equipment - helicopters, 4-wheelers, farming equipment, and even a"+
      "small space shuttle. Halfway up the room, a catwalk runs along the edges and across the center.  Ladders lead from"+
      "the floor to the catwalk, and two cargo elevators help move heavy loads between them. There are four doors in the"+
      "room, one in the center of each wall.  One of the elevators lies in the center of the room, and the other in the"+
      "fore-port corner.  The three ladders are spaced through the room, one to the fore, one in the center, and one aft."+
      "The center ladder continues to rise above the catwalk, leading to a hatch in the ceiling, with an identical hatch on"+ 
      "the floor at the foot of the ladder.")


mutBiconnect(portLanderQuarters, landerMess)
mutBiconnect(portLanderQuarters, cargoHold)
mutBiconnect(portLanderQuarters, engineering)

mutBiconnect(landerMess, starboardLanderQuarters)
mutBiconnect(landerMess, cargoHold)

mutBiconnect(cargoHold, starboardLanderQuarters)
mutBiconnect(cargoHold, engineering)

mutBiconnect(starboardLanderQuarters, engineering)


// LANDER TOP //

var portCryo = mutRoomCreate("portCryo", "Port Cryo Room",
      "The long room curves slightly with the outer hull of the ship.  Along both sides of the room, hundreds of cryogenic"+
      "pods line the walls, most of them dark.  Only a few glow with the soft light that indicates life inside.  Five pods"+
      "stand open, their former inhabitants gone. \n\n"+

      "Water drips softly from the dead tubes through the steel grate that makes up the floor into the space below.  (Dim"+
      "light comes from the emergency lights spaced at wide intervals along the room’s ceiling). \n\n"+
      "In addition to the cryo tubes, there are three doors in this room - one leading fore, another aft, and the third to"+
      "starboard from the center of the room.  At the fore end of the room, on the starboard side, there is a small personnel"+
      "elevator. \n\n"+
      
      "There is also an old computer terminal access, opposite the center door.")

var starboardCryo = mutRoomCreate("starboardCryo", "Starboard Cryo Room",
      "The long room curves slightly with the outer hull of the ship.  Along both sides of the room, hundreds of cryogenic pods"+
      "line the walls, most of them dark.  Only a few glow with the soft light that indicates life inside.  Five pods stand open,"+
      "their former inhabitants gone. \n\n"+

      "Water drips softly from the dead tubes through the steel grate that makes up the floor into the space below."+
      "(Dim light comes from the emergency lights spaced at wide intervals along the room’s ceiling).")

var cargoHoldCatwalk = mutRoomCreate("cargoHoldCatwalk", "Cargo Hold Catwalk",
      "You stand in a large cargo hold, filled to the brim with equipment and supplies.  Along the walls and in the center"+
      "of the room, floor-to-ceiling shelves are stuffed with hermetically sealed plastic bins holding who knows what."+
      "In between the shelves lie vehicles and large equipment - helicopters, 4-wheelers, farming equipment, and even a small"+
      "space shuttle.\n\n"+

      "You are halfway up the room on a catwalk running along the edges and across the center.  Ladders lead from the floor to"+
      "the catwalk, and two cargo elevators help move heavy loads between them.\n\n"+

      "One of the elevators lies in the center of the room, and the other in the fore-port corner.  The three ladders are spaced"+
      "through the room, one to the fore, one in the center, and one aft.  The center ladder continues to rise above the catwalk,"+
      "leading to a hatch in the ceiling, with an identical hatch on the floor at the foot of the ladder.")

var landerMedical = mutRoomCreate("landerMedical", "Lander Medical",
      "You stand in a small, compact medical center.  A couple of beds lie along one wall, and another wall is covered in"+
      "cabinets.  Every surface seems to shine with the sterile white color unique to hospitals.  The lights shine brightly"+
      "overhead, hurting your eyes momentarily as they adjust after the dimness outside.\n\n"+

      "There is a door that leads fore, and another that leads starboard.  In one corner of the room, there is also a ladder"+
      "leading down.")

var landerRecreation = mutRoomCreate("landerRecreation", "Lander Recreation",
      "Much of the room is taken up by exercise equipment.  Treadmills, stationary bicycles, resistance weights - everything"+
      "a body needs to stay fit in zero-g.  The rest of the room seems designed for gravity: ping-pong, pool, even a foosball"+
      "table, their balls and other accessories strapped down tight.  In one corner of the room, screens lie dark on the floor,"+
      "walls, and ceiling.\n\n"+

      "The two doors in this room lie on the fore and port walls.")

var landerBridge = mutRoomCreate("landerBridge", "Lander Bridge",
      "The nerve center of the ship.  Most of the room is taken up with workstations, cushioned crash seats bolted to the"+
      "floor in front of them.  Along the aft wall lie banks of computers, screens, and communication equipment.  Large windows"+
      "in the nose of the ship show the vast blackness of space outside (or the sun?), stars mere pinpricks of light wheeling"+
      "as the ship slowly turns.\n\n"+

      "A ladder near the back of the room leads down, and both doors are in the back wall, one on the port side, the"+
      "other starboard.\n\n"+

      "There is a computer access terminal in the computer banks along the aft wall.")


mutBiconnect(portCryo, landerBridge)
mutBiconnect(portCryo, cargoHoldCatwalk)
mutBiconnect(portCryo, landerMedical)

mutBiconnect(landerBridge, starboardCryo)

mutBiconnect(cargoHoldCatwalk, starboardCryo)

mutBiconnect(landerMedical, landerRecreation)

mutBiconnect(starboardCryo, landerRecreation)

// CONNECTIONS BETWEEN LEVELS //

var personnelElevator = mutRoomCreate("personnelElevator", "Personnel Elevator",
      "Choose your floor.")

var cargoElevator = mutRoomCreate("cargoElevator", "Cargo Elevator",
      "Choose your floor.")

var upperGangplank = mutRoomCreate("upperGangplank", "Upper Gangplank",
      "Connects to the orbiter")

var lowerGangplank = mutRoomCreate("lowerGangplank", "Lower Gangplank",
      "Connects to the orbiter")

mutBiconnect(personnelElevator, portCryo)
mutBiconnect(personnelElevator, portLanderQuarters)

mutBiconnect(cargoElevator, cargoHoldCatwalk)
mutBiconnect(cargoElevator, cargoHold)

mutBiconnect(upperGangplank, cargoHoldCatwalk)
mutBiconnect(upperGangplank, orbiterStorage)

mutBiconnect(lowerGangplank, cargoHold)
mutBiconnect(lowerGangplank, orbiterRecreation)

var jsonRooms = [
  orbiterStorage, orbiterMess, orbiterQuarters, orbiterRecreation, observationDeck, orbiterMedical, orbiterBridge,
  landerMess, starboardLanderQuarters, engineering, portLanderQuarters, cargoHold,
  portCryo, starboardCryo, cargoHoldCatwalk, landerMedical, landerRecreation, landerBridge,
  personnelElevator, cargoElevator, upperGangplank, lowerGangplank
]

function mutRoomCreate(id, name, description) {
  return {
    id: id,
    name: name,
    description: description,
    connections: {},
    details: {},
  }
}

function mutBiconnect(room1, room2) {
  mutConnect(room1, room2)
  mutConnect(room2, room1)
}

function mutConnect(fromRoom, toRoom) {
  if (!!fromRoom.connections[toRoom.id]) throw new Error("connection already exists: "+fromRoom.id+" "+toRoom.id)
  fromRoom.connections[toRoom.id] = {
    id: toRoom.id,
    name: toRoom.name
  }
}

function mutRoomstoImmut(rooms) {
  return Immutable.fromJS(rooms.reduce(function(rooms, room) {
    rooms[room.id] = room
    return rooms
  }, {}))
}



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


function roomCreate(id, name, description) {
  return Immutable.fromJS({
    id: id,
    name: name,
    description: description,
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

 //given a detail, provide
//function focusOptions(detail) {
  //return ["Look Around"]
//}

// ------------------------------------------------------------------


exports.rooms = mutRoomstoImmut(jsonRooms) //roomsMap(jsonRooms),
exports.portCryo = exports.rooms.get("portCryo")
exports.roomRawText = roomRawText
exports.detailName = detailName
exports.detailIsEnabled = detailIsEnabled
exports.detailIndex = detailIndex
exports.Broken = Broken
exports.detailById = detailById
exports.detailIsBroken = detailIsBroken

// ------------------------------------------------------------------



