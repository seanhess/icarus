var React     = require('react')
var component = require('../../lib/component')

var Ship = require('../ship')
var Game = require('../game')
var Player = require('../player')
var Time = require('./Time')
var {showStyle} = require('../../lib/render')

var Details = component(function({details}) {
  var elements = details.toArray().map(function(detail) {
    return <span key={detail.get('id')}><a 
      onClick={Game.onAction(Player.inspect(detail))}>
      {Ship.detailName(detail)}
    </a></span>
  })
  if (elements.length) {
    return <div>You see {elements}</div>
  }
  return <span/>
})

var Focused = component(function({time, detail}) {

  var showBreak = showStyle(Ship.detailIsEnabled(detail))
  var showFix = showStyle(Ship.detailIsBroken(detail))

  return <div>
    <p>
      <Time time={time}/>
      <span> - </span>
      <span>You are looking at: {Ship.detailName(detail)}</span>
    </p>

    <p>
      <div><a onClick={Game.onAction(Player.lookAround())}>Look Around</a> </div>
      <div><a style={showBreak} onClick={Game.onAction(Player.detailBreak())}>Break it</a> </div>
      <div><a style={showFix} onClick={Game.onAction(Player.detailFix())}>Fix it </a> </div>
    </p>
  </div>
})

exports.Main = Details
exports.Focused = Focused
