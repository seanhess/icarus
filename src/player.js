var Immutable = require('immutable')
var immstruct = require('immstruct')
var Ship = require('./ship')
var Events = require('./events/events')
var History = require('./history')
var {curry} = require('lodash')

exports.initialState = function() {
  return Immutable.fromJS({
    room: Ship.rooms.getIn(["crewQuarters", "id"]),
    detail: null, // the detail you are carefully looking at
  })
}

//exports.turn = function(action, state) {
  //// ok, you need to be able to update the rooms of the ship
  //// especially the room you are in
  //// can you return both?
  //// only update what you need to update?
  //// I need more information about an action


   ////Update Player State
  ////var newState = action(state)

  ////state.update('player', function(player) {
    ////var newPlayer = action(player)

     ////if they returned a detail, make the ship version match
    ////if (newPlayer.get('detail')) {
      ////console.log("NEW PLAYER DETAIL", newPlayer.get('detail').toJS())
      ////newPlayer = playerMatchLocationDetail(newPlayer)
    ////}

    ////return newPlayer
  ////})

  ////return newState

  //// now match ... I should dump JSON
  //// use that panel on the right!
  //// Match the room to the player's room / detail
  //// he modifies the ROOM...
  ////var currentRoomId = state.getIn(['player', 'location', 'id'])
  ////return newState.updateIn(['rooms', currentRoomId], function(room) {
    //////
  ////})
//}

//function playerMatchLocationDetail(player) {
  //var detail = player.get('detail')
  //return player.update('location', function(room) {
    //return room.setIn(['details', Ship.detailIndex(room, detail)], detail)
  //})
//}


// -- ACTIONS -------------------------------------------------

// what is it designed to modify?
// why not just have them edit everything?
// what type is it?

// PlayerAction: edits only player
// DetailAction: edits the focused detail

exports.moveTo = function(roomId) {
  return function(state) {
    return state.setIn(['player','room'], roomId)
  }
}

exports.inspect = function(detail) {
  return function(state) {
    return state.setIn(['player','detail'], detail.get('id'))
  }
}

exports.lookAround = function() {
  return function(state) {
    return state.setIn(['player','detail'], null)
  }
}

// I want to have the detail passed to me, but I need to know which one it was?
// hmm... 
exports.detailFix = function() {
  return function(state) {
    return state.updateIn(detailKeyPath(state), function(detail) {
      return detail.set('properties', Immutable.List([]))
    })
  }
}

exports.detailBreak = function() {
  return function(state) {
    return state.updateIn(detailKeyPath(state), function(detail) {
      return detail.update('properties', function(ds) {
        return ds.push(Ship.Broken())
      })
    })
  }
}

exports.detailEnable = curry(function(detail) {

})

exports.detailDisable = curry(function(detail) {

})

function roomKeyPath(player) {
  return ['rooms', '']
}

function detailKeyPath(state) {
  var roomId = state.getIn(['player', 'room'])
  var detailId = state.getIn(['player', 'detail'])
  return ['rooms', roomId, 'details', detailId]
}

function updateCurrentRoom(state, f) {

}

function updateCurrentDetail(state, f) {

  // needs to update the player detail AND the actual one in the room
  // first update the player detail

  var newDetail = state.getIn(['player', 'detail']).update(f)

  var currentRoomId = state.getIn(['player','location','id'])

  // I need to replace the current room
  // gah that's annoying that I'm duplicating the current room

  return state.update('player', function(player) {
    //return player.set('detail', newDetail)
      //.updateIn(['location','details'], function(details) {
        //return details.set(Ship.detailIndex(details, newDetail), newDetail)
      //})
  })

  // hmm... why is this so hard?
  // because I have duplicated / cached data. Don't do that!
  // just calculate it!

  // this is TOO COMPLICATED
  // serialize it and do it that way :)
}



// -- QUERY ------------------------------------------------------------

exports.playerDetail = function(game, player) {
  var detailId = player.get('detail')
  var room = Ship.roomById(game, player.get('room'))
  if (!detailId) return null
  return Ship.detailById(room, player.get('detail'))
}

exports.playerRoom = function(game, player) {
  return Ship.roomById(game, player.get('room'))
}
