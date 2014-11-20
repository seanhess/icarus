/* @flow */
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

exports.save = function(state) {
  history.cursor().update(function(hs) {
    return hs.push(state)
  })
}

