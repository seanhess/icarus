var Immutable = require('immutable')
var immstruct = require('immstruct')
var Ship = require('../ship')
var {curry, find} = require('lodash')
var Details = require('../ship/details')

exports.initialState = function() {
  return Immutable.fromJS({
    room: Ship.portCryo.get('id'),
    lastRoom: null,
    detail: null, // the detail you are carefully looking at
    inventory: [],
    dead: false
  })
}

// -- ACTIONS -------------------------------------------------

// every action is a function that takes the state and returns the modified state

exports.moveTo = function(roomId) {
  return function({player}) {
    player.set('lastRoom', player.get('room'))
    player.set('room', roomId)
  }
}

exports.inspect = function(detail) {
  return function({player}) {
    player.set('detail', detail.get('id'))
  }
}

exports.lookAround = function() {
  return function({player, events}) {
    player.set('detail', null)
    events.set('event', null)
  }
}

exports.detailChange = function(key, value) {
  return function({detail}) {
    Details.modify(detail, key, value)
  }
}

// you can only collect the detail you have focused
exports.detailCollect = function() {
  return function({detail, player, room}) {
    room.update('details', (ds) => {
      return ds.delete(detail.get('id'))
    })

    player.update('inventory', (items) => items.push(detail.deref()))
  }
}

exports.wait = function() {
  return function() {

  }
}



// -- QUERY ------------------------------------------------------------

exports.playerDetail = function(game, player) {
  var detailId = player.get('detail')
  var room = Ship.roomById(game, player.get('room'))
  if (!detailId) return null
  return room.getIn(Details.keyPath(player.get('detail')))
}

exports.playerRoom = function(game, player) {
  return Ship.roomById(game, player.get('room'))
}

exports.itemOfType = function(inventory, type) {
  return find(inventory.toArray(), function(detail) {
    return detail.get('type') == type
  })
}
