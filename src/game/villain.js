var Immutable = require('immutable')
var immstruct = require('immstruct')
var dijkstra = require('./dijkstra')
var Ship = require('../ship')
var Details = require('../ship/details')

exports.initialState = function() {
  return Immutable.Map({
    location: Ship.rooms.getIn(["orbiterBridge", "id"])
  })
}

exports.turn = function({villain, game}) {
  // 1. calculate action based on state
  // 2. perform action
  var rooms = game.get('rooms')
  var {move, action} = intendedAction(rooms, villain)

  if (villain.get('location') == move) {
    // action
    console.log("ACT")
    action()
  }
  else {
    // MOVE to the room if not in it
    console.log("MOVE", move)
    var moveUpdate = moveTowardGoal(villain, rooms, move)
    villain.update('location', moveUpdate)
  }


}

function randomMove(villain) {
  var connections = Object.keys(villain.getIn(['location', 'connections']).toObject())
  var nextRoomId = connections[Math.floor(Math.random()*connections.length)]
  return function(l) {
    return Ship.rooms.get(nextRoomId)
  }
}

function moveTowardGoal(villain, rooms, goal) {
  if (!goal) throw new Error("Invalid Goal")
  var currentRoom = villain.get("location")
  var nextRoomId = dijkstra.nextRoomToDestination(rooms, currentRoom, goal)
  return function(l) {
    return nextRoomId
  }
}

function intendedAction(rooms, villain) {
  var engineering = rooms.get('engineering')
  var engine = engineering.cursor(Details.typeKeyPath(engineering, Details.ENGINE))

  if (Details.isWorking(engine)) {
    return {move: "engineering", action: actionBreak(engine)}
  }
  else {
    return {move: "orbiterBridge", action: actionNothing}
  }
}

// I intend to break the detail :)
function actionBreak(detail) {
  return function() {
    Details.breakIt(detail)
  }
}

function actionNothing() {

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


exports.isSeen = function(player, villain) {
  return player.get('room') == villain.get('location')
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
    //villain.cursor('location').update(moveTo(action.get('room')))
  //}
//}
