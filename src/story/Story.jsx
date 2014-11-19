var React     = require('react')
var component = require('../../lib/component')

var Ship = require('../ship')
var Game = require('../game')
var Terminal = require('../terminal/Terminal')
var Events = require('../events/events')
var History = require('../history')
var Player = require('../player')
var Villain = require('../villain')
var Details = require('./Details')
var Time = require('./Time')
var {LinkParagraph, makeLinkMove, killLink} = require('./Links.jsx')

var StoryMain = component(function({game, history}) {
  var log = history.toArray().map(function(state) {
    return <PlayerView game={state} makeLink={killLink}/>
  })

  return <div>
    <div>{log}</div>
    <PlayerView game={game} makeLink={makeLinkMove}/>
  </div>
})


var PlayerView = component(function({game, makeLink}) {
  var player = game.get('player')
  var villain = game.get('villain')
  var room = Player.playerRoom(game, player)
  var detail = Player.playerDetail(game, player)

  if (detail) {
    return <Details.Focused time={game.get('time')} detail={detail}/>
  }

  else {
    return <div>
      <p><Time time={game.get('time')}/>
        <span> - </span>
        <LinkParagraph text={room.get('description')} makeLink={makeLink}/>
      </p>
      <p><Details.Main details={room.cursor('details')}/></p>
      <p><VillainFound player={player} villain={villain}/></p>
    </div>
  }
})


var VillainFound = component(function({player, villain}) {
  if (Villain.isSeen(player, villain)) {
    return <span>You see the bad guy</span>
  }
  return <span/>
})



exports.Main = StoryMain
