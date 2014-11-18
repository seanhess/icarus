var React     = require('react')
var immstruct = require('immstruct')
var component = require('../../lib/component')

var Ship = require('../ship')
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
  var detail = player.get('detail')

  if (detail) {
    return <div>
      <p><Time time={game.get('time')}/>
        <span> - </span>
        <span>FOCUS MUCH?</span>
      </p>
    </div>
  }

  else {
    return <div>
      <p><Time time={game.get('time')}/>
        <span> - </span>
        <LinkParagraph text={room.get('description')} makeLink={makeLink}/>
      </p>
      <p><Details details={room.cursor('details')}/></p>
      <p><VillainFound player={player} villain={villain}/></p>
    </div>
  }

})

var Details = component(function({details}) {
  var elements = details.toArray().map(function(detail) {
    return <span><a 
      href="#"
      onClick={selectDetail(detail)}>
      {Ship.detailName(detail)}
    </a></span>
  })
  if (elements.length) {
    return <div>You see {elements}</div>
  }
  return <span/>
})

var VillainFound = component(function({player, villain}) {
  if (Villain.isSeen(player, villain)) {
    return <span>You see the bad guy</span>
  }
  return <span/>
})

var Time = component(function({time}) {
  return <span>{Events.renderTime(time)}</span>
})

function selectDetail(detail) {
  return function() {
    var action = Player.inspect(detail)
    Game.runTick(action)
  }
}

