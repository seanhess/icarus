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
var {showStyle} = require('../../lib/render')

var StoryMain = component(function({game, history}) {
  var log = history.toArray().map(function(state) {
    return <PlayerView game={state} makeLink={killLink} key={state.get('turn')}/>
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

  var showDetails        = showStyle(!detail)
  var showFocusedDetails = showStyle(detail)

  return <div>
    <EntrySeparator room={room} time={game.get('time')} />
    <div style={showDetails}>
      <p><LinkParagraph text={room.get('description')} makeLink={makeLink}/></p>
      <p><Details.Main details={room.cursor('details')}/></p>
      <p><VillainFound player={player} villain={villain}/></p>
    </div>

    <div style={showFocusedDetails}>
      <Details.Focused time={game.get('time')} detail={detail}/>
    </div>
  </div>
})


var VillainFound = component(function({player, villain}) {
  if (Villain.isSeen(player, villain)) {
    return <span>You see the bad guy</span>
  }
  return <span/>
})

var EntrySeparator = component(function({time, room}) {

  var style = {
    backgroundColor: "#333",
    color: "white",

  }

  return <div style={style}>
    <div>
      <Time time={time}/>
      <span> - </span>
      <span>{room.get('name')}</span>
    </div>
  </div>
})



exports.Main = StoryMain
