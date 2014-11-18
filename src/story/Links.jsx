var React     = require('react')
var component = require('../../lib/component')
var Game = require('../game')
var Player = require('../player')
var {flatten} = require('lodash')

var LinkParagraph = component(function({text, makeLink}) {
  var _text = text.toJS()
  var innerContent = _text.map(function(spanText) {
    if (Array.isArray(spanText)) {
      var href = spanText[1]
      var text = spanText[0]
      return React.DOM.a(makeLink(href), text)
    }
    else return React.DOM.span(null, spanText)
  }).map(function(el) {
    return [el, " "]
  })
  var flat = flatten(innerContent)
  return React.DOM.span(null, flat)
})

function makeLinkMove(href) {
  return {
    onClick: onClickMove(href),
    href: "#"
  }
}

function killLink() {
  return {}
}

function onClickMove(room) {
  return function() {
    var action = Player.moveTo(room)
    Game.runTick(action)
  }
}

exports.LinkParagraph = LinkParagraph
exports.makeLinkMove = makeLinkMove
exports.killLink = killLink
