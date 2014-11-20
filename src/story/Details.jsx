var React     = require('react')
var component = require('../../lib/component')

var Ship = require('../ship')
var Game = require('../game')
var Player = require('../player')
var Time = require('./Time')
var {showStyle} = require('../../lib/render')

var Details = component(function({details}) {
  var elements = details.toArray().map(function(detail) {
    return <span><a 
      onClick={runTick(Player.inspect(detail))}>
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
      <button onClick={runTick(Player.lookAround())}>Look Around</button>
      <button style={showBreak} onClick={runTick(Player.detailBreak())}>Break it</button>
      <button style={showFix} onClick={runTick(Player.detailFix())}>Fix it</button>
    </p>
  </div>
})

function runTick(action) {
  return function() {
    Game.runTick(action)
  }
}

exports.Main = Details
exports.Focused = Focused
