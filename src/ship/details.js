
// Details
exports.TERMINAL  = "terminal"
exports.TOOLS     = "tools"
exports.ENGINE    = "engine"
exports.WEAPON    = "weapon"

// Properties
exports.BROKEN      = "broken"
exports.DISABLED    = "disabled"
exports.LOCKED      = "locked"
exports.COLLECTABLE = "collectable"

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

function equals(d1, d2) {
  return d1.get('id') == d2.get('id')
}

// do I have a handle on the detail?
// you already have the room, so start there
function typeKeyPath(room, type) {
  var detail = room.get('details').find(d => {
    return d.get('type') == type
  })
  if (!detail) {
    console.log("ERROR", room.toJS())
    throw new Error("Could not find detail: " + room.get('id') + " " + type)
  }
  var detailId = detail.get('id')
  return keyPath(detailId)
}

function keyPath(detailId) {
  return ["details", detailId]
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

function isWorking(detail) {
  if (!detail) return false

  var props = detail.get('properties')
  return !(props.get(exports.BROKEN) || props.get(exports.DISABLED) || props.get(exports.LOCKED))
}

function isBroken(detail) {
  if (!detail) return false
  return detail.get(BROKEN)
}

function breakIt(detail) {
  return modify(detail, exports.BROKEN, true)
}

function modify(detail, key, value) {
  return detail.update('properties', (props) => props.set(key, value))
}

exports.equals      = equals
exports.typeKeyPath = typeKeyPath
exports.keyPath     = keyPath
exports.isWorking   = isWorking
exports.isBroken    = isBroken
exports.breakIt     = breakIt
exports.modify      = modify
