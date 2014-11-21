var React     = require('react')
var component = require('../../lib/component')
var Events = require('../game/events')

var Time = component(function({time}) {
  return <span>{Events.renderTime(time)}</span>
})

module.exports = Time

