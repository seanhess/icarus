var _ = require('lodash')
var {TERMINAL, BROKEN, DISABLED, LOCKED, COLLECTABLE, TOOLS, ENGINE, WEAPON} = require("./details")

/// The ship is constructed first in the mutable world to make it easier to connect things, etc.


//////////////////////////
/// ORBITER //////////////
//////////////////////////

var orbiterStorage = Room("orbiterStorage", "Orbiter Storage",
    "This room is filled with everything a man could need during his months in space. "+
    "The shelves are stocked with food, clothing, toiletries, spare parts, and many other "+
    "things stored in airtight containers without labels.  Why isn&#8217;t anything labeled?? "+ 
    "On each end of the room, an airlock leads to another section of the orbiter. "+
    "At least the doors are labeled!  A ladder leads upward as well, toward the center.",
    []
)

var orbiterMess = Room("orbiterMess", "Orbiter Mess",
    "You see a small room, divided equally between seating and food preparation.  Only a few "+
    "chairs are attached to the table, and the kitchen - if you can even call it that, it looks "+
    "more like a food-rehydration station - could only prepare food for a small number of people. "+
    "An airlock leads from one end of the room, a normal door from the other.",
    []
)

var orbiterQuarters = Room("orbiterQuarters", "Orbiter Quarters",
    "A narrow hallway runs the length of this section, the upward curve of the floor clearly visible "+
    "along its length.  Two doors stand on each side of the hallway, leading into small rooms. "+
    "There is an airlock door at the each end of the hallway, and a ladder in the center of the hall "+
    "leading upward to the center.",
    []
)

var orbiterRecreation = Room("orbiterRecreation", "Orbiter Recreation",
    "A treadmill, a stationary bike, a couch with a television, and a one-man ping-pong table - that&#8217;s about "+
    "all that they managed to cram into this recreation center. Doors lead from the room on either end, and along "+
    "one wall a ladder leads upward to a hatch in the ceiling.",
    []
)

var observationDeck = Room("observationDeck", "Observation Deck",
    "Glass floor, walls, ceiling - who thought this was a good idea?  Vertigo strikes you for a moment as you seem "+
    "to be suddenly standing in the midst of space, with only the walls at either end lending reality to your "+
    "circumstance.  A few comfortable chairs lie in the center of the room. There is a door in each wall at the "+
    "ends of the room.",
    []
)

var orbiterMedical = Room("orbiterMedical", "Orbiter Medical",
    "You stand in a small medical center, obviously only capable of caring for one person at a time.  Although "+
    "there are some medical supplies in cabinets along the walls, the majority of the room is given to an examination "+
    "bed with a robotic arm hovering over it. In one end of the room, an airlock leads to another section, with a normal "+
    "door opposite.",
    []
)

var orbiterBridge = Room("orbiterBridge", "Orbiter Bridge",
    "An entire corner of the room is taken up by large databanks, secured behind reinforced steel.  The rest of the room "+
    "is given over to various workstations, all covered with many switches and buttons and blinking lights.  The chairs "+
    "at the stations look comfortable, capable of helping you get through many hours of work. Both ends of the room hold "+ 
    "airlock doors, and a ladder leads upward toward an airlock hatch.",
    []
)

biconnect(orbiterQuarters, orbiterStorage)

biconnect(orbiterStorage, orbiterBridge)

biconnect(orbiterBridge, orbiterMedical)

biconnect(orbiterMedical, observationDeck)

biconnect(observationDeck, orbiterRecreation)

biconnect(orbiterRecreation, orbiterMess)

biconnect(orbiterMess, orbiterQuarters)


////////////////////////////
/// LANDER BOTTOM //////////
////////////////////////////

var landerMess = Room("landerMess", "Lander Mess",
    "Great, a cafeteria.  How do they manage to all look the same?  Most of the space is filled with tables, bolted "+
    "to the floor with benches as their sides.  Tucked into the nose of the ship is a small kitchen, including fridge "+
    "and freezer, stove, and serving counters. Against the aft wall of the room is a ladder leading upward, and in "+
    "that same wall there are three doors, in the center, port, and starboard.",
    []
)

var starboardLanderQuarters = Room("starboardLanderQuarters", "Starboard Lander Quarters",
    "You are in a long hallway leading from bow to stern.  On both sides of the hallway, doors line the walls leading "+
    "to individual crew rooms.  Another short hallway cuts across the center of the main hall.  Each hallway has a door "+
    "at both ends.",
    []
)

var engineering = Room("engineering", "Engineering",
    "You stand in the center of a veritable jungle of pipes, wires, screens, and computer terminals.  A large section of "+
    "the room is walled off into its own chamber with radiation warnings on the door.  Several large tanks with hazardous "+
    "materials signs stand clustered in one corner. There are three doors along the fore wall: port, center, and aft. "+
    "Next to the center door you see a ladder leading upward. There are several computer access terminals among the more "+
    "esoteric control stations.",
    [
      Detail("engine", "engine", {broken: false, disabled: true})
    ]
)

var portLanderQuarters = Room("portLanderQuarters", "Port Lander Quarters",
    "You are in a long hallway leading from bow to stern.  On both sides of the hallway, doors line the walls leading "+
    "to individual crew rooms.  Another short hallway cuts across the center of the main hall.  Each hallway has a door "+
    "at both ends.  There is a small personnel elevator at the fore end of the hallway, on the starboard side.",
    []
)

var cargoHold = Room("cargoHold", "Cargo Hold",
    "You stand in a large cargo hold, filled to the brim with equipment and supplies.  Along the walls and in the center "+
    "of the room, floor-to-ceiling shelves are stuffed with hermetically sealed plastic bins holding who knows what. "+
    "In between the shelves lie vehicles and large equipment - helicopters, 4-wheelers, farming equipment, and even a "+
    "small space shuttle. Halfway up the room, a catwalk runs along the edges and across the center.  Ladders lead from "+
    "the floor to the catwalk, and two cargo elevators help move heavy loads between them. There are four doors in the "+
    "room, one in the center of each wall.  One of the elevators lies in the center of the room, and the other in the "+
    "fore-port corner.  The three ladders are spaced through the room, one to the fore, one in the center, and one aft. "+
    "The center ladder continues to rise above the catwalk, leading to a hatch in the ceiling, with an identical hatch on "+ 
    "the floor at the foot of the ladder.",
    [
    ]
)


biconnect(portLanderQuarters, landerMess)
biconnect(portLanderQuarters, cargoHold)
biconnect(portLanderQuarters, engineering)

biconnect(landerMess, starboardLanderQuarters)
biconnect(landerMess, cargoHold)

biconnect(cargoHold, starboardLanderQuarters)
biconnect(cargoHold, engineering)

biconnect(starboardLanderQuarters, engineering)


///////////////////////////////
/// LANDER TOP ////////////////
///////////////////////////////

var portCryo = Room("portCryo", "Port Cryo Room",
    "The long room curves slightly with the outer hull of the ship.  Along both sides of the room, hundreds of cryogenic "+
    "pods line the walls, most of them dark.  Only a few glow with the soft light that indicates life inside.  Five pods "+
    "stand open, their former inhabitants gone. \n\n"+

    "Water drips softly from the dead tubes through the steel grate that makes up the floor into the space below.  (Dim "+
    "light comes from the emergency lights spaced at wide intervals along the room&#8217;s ceiling). \n\n"+
    "In addition to the cryo tubes, there are three doors in this room - one leading fore, another aft, and the third to "+
    "starboard from the center of the room.  At the fore end of the room, on the starboard side, there is a small personnel "+
    "elevator. \n\n"+

    "There is also an old computer terminal access, opposite the center door.",
    [
        Terminal({broken: true}),
        Detail(TOOLS, "sonic screwdriver", {collectable: true}),
    ]
)

var starboardCryo = Room("starboardCryo", "Starboard Cryo Room",
    "The long room curves slightly with the outer hull of the ship.  Along both sides of the room, hundreds of cryogenic pods "+
    "line the walls, most of them dark.  Only a few glow with the soft light that indicates life inside.  Five pods stand open, "+
    "their former inhabitants gone. \n\n"+

    "Water drips softly from the dead tubes through the steel grate that makes up the floor into the space below. "+
    "(Dim light comes from the emergency lights spaced at wide intervals along the room&#8217;s ceiling).",
    []
)

var cargoHoldCatwalk = Room("cargoHoldCatwalk", "Cargo Hold Catwalk",
    "You stand in a large cargo hold, filled to the brim with equipment and supplies.  Along the walls and in the center "+
    "of the room, floor-to-ceiling shelves are stuffed with hermetically sealed plastic bins holding who knows what. "+
    "In between the shelves lie vehicles and large equipment - helicopters, 4-wheelers, farming equipment, and even a small "+
    "space shuttle.\n\n"+

    "You are halfway up the room on a catwalk running along the edges and across the center.  Ladders lead from the floor to "+
    "the catwalk, and two cargo elevators help move heavy loads between them.\n\n"+

    "One of the elevators lies in the center of the room, and the other in the fore-port corner.  The three ladders are spaced "+
    "through the room, one to the fore, one in the center, and one aft.  The center ladder continues to rise above the catwalk, "+
    "leading to a hatch in the ceiling, with an identical hatch on the floor at the foot of the ladder.",
    []
)

var landerMedical = Room("landerMedical", "Lander Medical",
    "You stand in a small, compact medical center.  A couple of beds lie along one wall, and another wall is covered in "+
    "cabinets.  Every surface seems to shine with the sterile white color unique to hospitals.  The lights shine brightly "+
    "overhead, hurting your eyes momentarily as they adjust after the dimness outside.\n\n"+

    "There is a door that leads fore, and another that leads starboard.  In one corner of the room, there is also a ladder "+
    "leading down.",
    []
)

var landerRecreation = Room("landerRecreation", "Lander Recreation",
    "Much of the room is taken up by exercise equipment.  Treadmills, stationary bicycles, resistance weights - everything "+
    "a body needs to stay fit in zero-g.  The rest of the room seems designed for gravity: ping-pong, pool, even a foosball "+
    "table, their balls and other accessories strapped down tight.  In one corner of the room, screens lie dark on the floor, "+
    "walls, and ceiling.\n\n"+

    "The two doors in this room lie on the fore and port walls.",
    []
)

var landerBridge = Room("landerBridge", "Lander Bridge",
    "The nerve center of the ship.  Most of the room is taken up with workstations, cushioned crash seats bolted to the "+
    "floor in front of them.  Along the aft wall lie banks of computers, screens, and communication equipment.  Large windows "+
    "in the nose of the ship show the vast blackness of space outside (or the sun?), stars mere pinpricks of light wheeling "+
    "as the ship slowly turns.\n\n"+

    "A ladder near the back of the room leads down, and both doors are in the back wall, one on the port side, the "+
    "other starboard.\n\n"+

    "There is a computer access terminal in the computer banks along the aft wall.",
    [
        Terminal({broken: false}),
        Detail("pile", "pile of rubble", {}),
        Detail(WEAPON, "pistol", {weapon: 2, collectable: true}),
    ]
)


biconnect(portCryo, landerBridge)
biconnect(portCryo, cargoHoldCatwalk)
biconnect(portCryo, landerMedical)

biconnect(landerBridge, starboardCryo)

biconnect(cargoHoldCatwalk, starboardCryo)

biconnect(landerMedical, landerRecreation)

biconnect(starboardCryo, landerRecreation)


////////////////////////////////
/// PUTTING IT ALL TOGETHER ////
////////////////////////////////

var personnelElevator = Room("personnelElevator", "Personnel Elevator",
    "Choose your floor.",  //TODO: add descriptions.
    []
)

var cargoElevator = Room("cargoElevator", "Cargo Elevator",
    "Choose your floor.",
    []
)

var upperGangplank = Room("upperGangplank", "Upper Gangplank",
    "Connects the orbiter to the lander.",
    []
)

var lowerGangplank = Room("lowerGangplank", "Lower Gangplank",
    "Connects the orbiter to the lander",
    []
)

biconnect(personnelElevator, portCryo)
biconnect(personnelElevator, portLanderQuarters)

biconnect(cargoElevator, cargoHoldCatwalk)
biconnect(cargoElevator, cargoHold)

biconnect(upperGangplank, cargoHoldCatwalk)
biconnect(upperGangplank, orbiterStorage)

biconnect(lowerGangplank, cargoHold)
biconnect(lowerGangplank, orbiterRecreation)


var rooms = exports.rooms = _.indexBy([
    orbiterStorage, orbiterMess, orbiterQuarters, orbiterRecreation, observationDeck, orbiterMedical, orbiterBridge,
    landerMess, starboardLanderQuarters, engineering, portLanderQuarters, cargoHold,
    portCryo, starboardCryo, cargoHoldCatwalk, landerMedical, landerRecreation, landerBridge,
    personnelElevator, cargoElevator, upperGangplank, lowerGangplank
], "id")



//////////////////////////////
/// LIBRARY //////////////////
//////////////////////////////

function Room(id, name, description, details) {
    var detailsWithIds = _.map(details, (detail) => _.defaults({id: id+detail.name}, detail))
    var detailsMap = _.indexBy(detailsWithIds, "id")
    return {
        id: id,
        name: name,
        description: description,
        connections: {},
        details: detailsMap,
    }
}


function Terminal(properties) {
  return Detail(TERMINAL, TERMINAL, properties)
}

function Detail(type, name, properties) {
  return {
    type: type, // terminal
    name: name || type, // terminal
    properties: properties || {} // like broken
  }
}


function biconnect(room1, room2) {
  connect(room1, room2)
  connect(room2, room1)
}

function connect(fromRoom, toRoom) {
  if (!!fromRoom.connections[toRoom.id]) throw new Error("connection already exists: "+fromRoom.id+" "+toRoom.id)
  fromRoom.connections[toRoom.id] = {
    id: toRoom.id,
    name: toRoom.name
  }
}


