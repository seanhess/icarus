var React     = require('react')
var immstruct = require('immstruct')
var component = require('../../lib/component')

var ship = require('../ship')
var Game = require('../game')
var Terminal = require('../terminal/Terminal')
var Events = require('../events/events')
var History = require('../history')
var Player = require('../player')
var Villain = require('../villain')
var {LinkParagraph, makeLinkMove, killLink} = require('./Links.jsx')

var StoryMain = component(function({game, history}) {
  var log = history.toArray().map(function(state) {
    return <PlayerView game={state} makeLink={killLink}/>
  })

  return <div>
    <div>{log}</div>
    <PlayerView game={game} makeLink={makeLinkMove}/>
    <button onClick={Terminal.openTerminal}>Open Terminal</button>
    <button onClick={Terminal.closeTerminal}>Close Terminal</button>
  </div>
})

exports.Main = StoryMain

var PlayerView = component(function({game, makeLink}) {
  var player = game.cursor('player')
  var villain = game.cursor('villain')
  var room = player.cursor('location')

  var villainView = <span/>
  if (Villain.isSeen(player, villain)) {
    villainView = <span>You see the bad guy</span>
  }

  return <div>
    <p>
      <span>{Events.renderTime(game.get('time'))}</span>
      <span> - </span>
      <LinkParagraph text={room.get('description')} makeLink={makeLink}/>
    </p>
    <p><Objects objects={room.cursor('objects')}/></p>
    <p>{villainView}</p>
  </div>
})

// need to be able to: select the terminal and have it open!
// woah...

// if termianl

var Objects = component(function({objects}) {
  var elements = objects.toArray().map(function(obj) {
    return <span><a 
      href="#"
      onClick={inspectObject(obj)}>
      {obj.get('name')}
    </a></span>
  })
  if (elements.length) {
    return <div>You see: {elements}</div>
  }
  return <span/>
})


function inspectObject(object) {
  return function() {
    console.log("UMM OK", object.get('name'))
    if (object.get('name') == "terminal") {
      Terminal.openTerminal()
    }
  }
}

