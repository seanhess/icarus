var React     = require('react')
var component = require('../../lib/component')
var intersperse = require('intersperse');

var Ship = require('../ship')
var {BROKEN, DISABLED, LOCKED, TERMINAL, COLLECTABLE, TOOLS} = require('../ship/details')

var Game = require('../game')
var Player = require('../game/player')
var Time = require('./Time')
var {showStyle} = require('../../lib/render')

var Details = component(function({details}) {

  var allDetails = details.toArray()
  if (!allDetails.length) return <div/>

  var elements = allDetails.map(function(detail) {
    return <span key={detail.get('id')}><a 
      onClick={Game.onAction(Player.inspect(detail))}>
      {detailName(detail)}
    </a></span>
  })

  var sentence = toSentenceList(elements)
  return <div>You see {sentence}</div>
})



// so, you can click fix it, but if you don't have the tools, it won't let you
  // is that an action?
  // how would I display it?

var Focused = component(function({time, detail, inventory}) {

  // show break if break: false
  var broken = detail.get(['properties', BROKEN])
  var disabled = detail.get(['properties', DISABLED])
  var collectable = detail.get(['properties', COLLECTABLE])

  var showBreak   = showStyle(broken === false)
  var showFix     = showStyle(broken === true)
  var showDisable = showStyle(disabled === false)
  var showEnable  = showStyle(disabled === true)
  var showCollect = showStyle(collectable === true)

  return <div>
    <p>{detailDescription(detail)}</p>

    <p>
      <div><a onClick={lookAround}>Look Around</a> </div>
      <div><a style={showBreak} onClick={detailBreak}>Break it</a> </div>
      <div><a style={showFix}   onClick={attemptFix(inventory)}>Fix it </a> </div>
      <div><a style={showDisable} onClick={detailDisable}>Disable it</a> </div>
      <div><a style={showEnable}  onClick={detailEnable}>Enable it </a> </div>
      <div><a style={showCollect}  onClick={detailCollect}>Take it </a> </div>
    </p>

  </div>
    //<p><pre>{JSON.stringify(detail.toJS(), null, "  ")}</pre></p>
})

var attemptFix = function(inventory) {
  return function() {
    if (Player.hasItem(inventory, TOOLS)) {
      return Game.putAction(Player.detailChange(BROKEN, false))
    }
    else {
      Game.showFeedback("You don't have any tools!")
    }
  }
}

var lookAround  = Game.onAction(Player.lookAround())
var detailBreak = Game.onAction(Player.detailChange(BROKEN, true))
var detailDisable = Game.onAction(Player.detailChange(DISABLED, true))
var detailEnable  = Game.onAction(Player.detailChange(DISABLED, false))
var detailCollect = Game.onAction(Player.detailCollect())


function toSentenceList(items) {
  if (items.length === 0) return []
  if (items.length === 1) return items
  return intersperse(items.slice(0, -1), ', ').concat([' and ', items[items.length-1]])
}

exports.Main = Details
exports.Focused = Focused

// the quick name for a detail
function detailName(detail) {
  if (!detail) return ""
  return "a " + detail.get('name')
}

// for most objects, just say whether they are broken
function detailDescription(detail) {
  if (!detail) return ""
  var properties = detail.get('properties')

  var status = ""

  if (properties.get(BROKEN) === true) {
    status = " is broken"
  }
  else if (properties.get(DISABLED) === true) {
    status = " is disabled"
  }
  else if (properties.get(BROKEN) === false && properties.get(DISABLED) === false) {
    status = " seems to be working properly"
  }
  else {
    if (detail.get('type') == TERMINAL) {
      return "The terminal comes to life..."
    }
    // no a terminal should be disabled differently :)
    // move all of this to the views!
    return "There isn't anything interesting about this " + detail.get('name')
  }

    //var adjectives = properties.map(propertyName).toArray().join(", ")
  return "This " + detail.get("name") + status
}
