var Immutable = require('immutable')
var immstruct = require('immstruct')
var dijkstra = require('./dijkstra')
var Ship = require('../ship')
var Details = require('../ship/details')
var Player = require('./player')

var startingRoom = "orbiterBridge"
//var startingRoom = "starboardCryo"

var ACTION_MOVE = exports.ACTION_MOVE = "move"
var ACTION_WAIT = exports.ACTION_WAIT = "wait"
var ACTION_BREAK = exports.ACTION_BREAK = "break"

exports.initialState = function() {
  return Immutable.Map({
    room: Ship.rooms.getIn([startingRoom, "id"]),
    weapon: 1,
    dead: false,
    action: ACTION_BREAK,
  })
}

exports.turn = function({villain, game, player}) {

  if (villain.get('dead'))
    return

  // 1. calculate action based on state
  // 2. perform action
  var rooms = game.get('rooms')
  var {move, action} = intendedAction(rooms, villain, player)

  if (villain.get('room') == move) {
    // action
    action(villain)
  }
  else {
    // MOVE to the room if not in it
    var moveUpdate = moveTowardGoal(villain, rooms, move)
    villain.update('room', moveUpdate)
    villain.set('action', ACTION_MOVE)
  }
}

function randomMove(villain) {
  var connections = Object.keys(villain.getIn(['room', 'connections']).toObject())
  var nextRoomId = connections[Math.floor(Math.random()*connections.length)]
  return function(l) {
    return Ship.rooms.get(nextRoomId)
  }
}

function moveTowardGoal(villain, rooms, goal) {
  if (!goal) throw new Error("Invalid Goal")
  var currentRoom = villain.get("room")
  var nextRoomId = dijkstra.nextRoomToDestination(rooms, currentRoom, goal)
  return function(l) {
    return nextRoomId
  }
}

function avoid(rooms, path) {
  // move to a random door, except the one towards the player
  var badDoor = path[1]
  var currentRoomId = path[0]
  var exits = Object.keys(rooms.getIn([currentRoomId, "connections"]).toObject())
  var validExits = exits.filter(e => e != badDoor)
  return validExits[Math.floor(Math.random()*validExits.length)]
}

function intendedAction(rooms, villain, player) {

  // first, run away
  var path = dijkstra.pathToRoom(rooms, player.get('room'), villain.get('room'))
  if (path.length <= 3) {
     // right next to each other, or one away (same as hearing distance)
     return {move: avoid(rooms, path), action: actionAvoid}
  }


  var engineering = rooms.get('engineering')
  var engine = engineering.cursor(Details.typeKeyPath(engineering, Details.ENGINE))

  // if something is working, go break it
  if (Details.isWorking(engine)) {
    return {move: "engineering", action: actionBreak(engine)}
  }
  else {
    return {move: startingRoom, action: actionNothing}
  }
}

// I intend to break the detail :)
function actionBreak(detail) {
  return function(villain) {
    Details.breakIt(detail)
    villain.set('action', ACTION_BREAK)
  }
}

function actionNothing(villain) {
  villain.set('action', ACTION_WAIT)
}

function actionAvoid(villain) {
  villain.set('action', ACTION_MOVE)
}


//function engineKeyPath(rooms) {
  //return ["engineering", "details", detailId]
//}

//var villain = immstruct({
  //action: {
    //time: Events.START_TIME.add(120),
    //room: Ship.rooms.get("hall"),
  //}
//})

//// give him a starting goal

//exports.state = villain

exports.killsPlayer = function(villain, player) {
  console.log("CHECK", player.toJS())
  var weapon = Player.itemOfType(player.get('inventory'), Details.WEAPON)
  if (!weapon) return true
  return weapon.getIn(['properties', 'weapon']) <= villain.get('weapon')
}

exports.isSeen = function(villain, player) {
  return player.get('room') == villain.get('room')
}

// he is heard if the distance between villain and player is < N
exports.heardClue = function(rooms, villain, player) {

  var path = dijkstra.pathToRoom(rooms, villain.get('room'), player.get('room'))

  // harder to hear if it's just movement
  var hearDistance;

  if (villain.get('action') == ACTION_BREAK) {
    hearDistance = 3
  }
  else if (villain.get('action') == ACTION_MOVE) {
    hearDistance = 2
  }
  else {
    hearDistance = 1
  }

  var distance = path.length - 1

  // in the next room or the one after
  if (distance <= hearDistance) {
    return path[1]
  }
  return false
}

//// how to handle time... he makes a move?
//// he has an action that will happen at a certain time
//// as soon as it happens, he does it
//// no, you sort of re-evaluate his actions based on the state, right?
//// so what do you need?
//// I need to know the last time he did an action
//// what he is DOING right now. There's a duration
//// if he has a goal

//// I need a better model...

//function moveTo(room) {
  //return function(l) {
    //return Ship.rooms.get(room)
  //}
//}

//exports.timePassed = function(currentTime) {
  //var action = villain.cursor('action')
  //if (currentTime.diff(action.get('time')) > 0) {
    //// so do it!
    //villain.cursor('room').update(moveTo(action.get('room')))
  //}
//}
