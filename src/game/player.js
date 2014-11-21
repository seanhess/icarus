var Immutable = require('immutable')
var immstruct = require('immstruct')
var Ship = require('../ship')
var {curry} = require('lodash')
var Details = require('../ship/details')

exports.initialState = function() {
  return Immutable.fromJS({
    room: Ship.portCryo.get('id'),
    detail: null, // the detail you are carefully looking at
    inventory: [],
  })
}

// -- ACTIONS -------------------------------------------------

// every action is a function that takes the state and returns the modified state

exports.moveTo = function(roomId) {
  return function({player}) {
    player.set('room', roomId)
  }
}

exports.inspect = function(detail) {
  return function({player}) {
    player.set('detail', detail.get('id'))
  }
}

exports.lookAround = function() {
  return function({player}) {
    player.set('detail', null)
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

exports.hasItem = function(inventory, type) {
  return inventory.toArray().filter(function(detail) {
    return detail.get('type') == type
  }).length > 0
}
