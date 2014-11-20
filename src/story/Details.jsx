var React     = require('react')
var component = require('../../lib/component')
var intersperse = require('intersperse');

var Ship = require('../ship')
var Game = require('../game')
var Player = require('../player')
var Time = require('./Time')
var {showStyle} = require('../../lib/render')

var Details = component(function({details}) {

  var allDetails = details.toArray()
  if (!allDetails.length) return <div/>

  var elements = allDetails.map(function(detail) {
    return <span key={detail.get('id')}><a 
      onClick={Game.onAction(Player.inspect(detail))}>
      {Ship.detailName(detail)}
    </a></span>
  })

  var sentence = toSentenceList(elements)
  return <div>You see {sentence}</div>

})

var Focused = component(function({time, detail}) {

  var showBreak = showStyle(Ship.detailIsEnabled(detail))
  var showFix = showStyle(Ship.detailIsBroken(detail))

  return <div>
    <p>{Ship.detailDescription(detail)}</p>

    <p>
      <div><a onClick={Game.onAction(Player.lookAround())}>Look Around</a> </div>
      <div><a style={showBreak} onClick={Game.onAction(Player.detailBreak())}>Break it</a> </div>
      <div><a style={showFix} onClick={Game.onAction(Player.detailFix())}>Fix it </a> </div>
    </p>
  </div>
})

function toSentenceList(items) {
  if (items.length === 0) return []
  if (items.length === 1) return items
    console.log("UUUUU")
  console.log("LENGTH", items)
  return intersperse(items.slice(0, -1), ', ').concat([' and ', items[items.length-1]])
}

exports.Main = Details
exports.Focused = Focused
