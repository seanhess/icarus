
var Immutable = require('immutable')
var immstruct = require('immstruct')
var dijkstra = require('./dijkstra')
var Ship = require('./ship')
var Events = require('./events/events')
var History = require('./history')


exports.initialState = function() {
  return Immutable.Map({
    location: Ship.rooms.get("bridge"),
    intention: Ship.rooms.get("engineRoom")
  })
}

exports.turn = function(state, villain) {
  // 1. calculate action based on state
  // 2. perform action
  var move = randomMove(villain)
  return villain.update('location', move)
}

function randomMove(villain) {
  var currentRoom = villain.get("location").toJS()
  var intendedRoom = villain.get("intention").toJS()
  console.log("current", currentRoom, intendedRoom)
  var nextRoomId = dijkstra.nextRoomToDestination(Ship.rooms, currentRoom, intendedRoom)
  console.log(nextRoomId, "nextRoomId")
  return function(l) {
    return Ship.rooms.get(nextRoomId)
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


exports.isSeen = function(villain, player) {
  return player.getIn(['location', 'id']) == villain.getIn(['location', 'id'])
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
