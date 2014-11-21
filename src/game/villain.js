var Immutable = require('immutable')
var immstruct = require('immstruct')
var dijkstra = require('./dijkstra')
var Ship = require('../ship')

exports.initialState = function() {
  return Immutable.Map({
    location: Ship.rooms.getIn(["bridge", "id"]),
    intention: Ship.rooms.getIn(["engineering", "id"])
  })
}

exports.turn = function({villain, game}) {
  // 1. calculate action based on state
  // 2. perform action
  var move = moveTowardGoal(villain, game.get('rooms'))
  villain.update('location', move)
}

function randomMove(villain) {
  var connections = Object.keys(villain.getIn(['location', 'connections']).toObject())
  var nextRoomId = connections[Math.floor(Math.random()*connections.length)]
  return function(l) {
    return Ship.rooms.get(nextRoomId)
  }
}

function moveTowardGoal(villain, rooms) {
  var currentRoom = villain.get("location")
  var intendedRoom = villain.get("intention")
  var nextRoomId = dijkstra.nextRoomToDestination(rooms, currentRoom, intendedRoom)
  return function(l) {
    return nextRoomId
  }
}

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
