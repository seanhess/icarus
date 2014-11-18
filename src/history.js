// stores the game story history
// so you can render it FOREVER

var Immutable = require('immutable')
var immstruct = require('immstruct')
var moment = require('moment')
var Events = require('./events/events')
var Ship = require('./ship')

// just has a bunch of strings in it for now
var history = immstruct([])

exports.state = history

exports.save = function(time, player) {
  history.cursor().update(function(hs) {
    var timeText = Events.renderTime(time)
    var roomText = Ship.roomRawText(player.get('location'))
    return hs.push(timeText + " - " + roomText)
  })
}

