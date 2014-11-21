var React     = require('react')
var component = require('../../lib/component')

var Ship = require('../ship')
var Game = require('../game')
var Terminal = require('../terminal/Terminal')
var Events = require('../game/events')
var Player = require('../game/player')
var Villain = require('../game/villain')
var Details = require('./Details')
var Time = require('./Time')
var {showStyle} = require('../../lib/render')
var {assign, map} = require('lodash')

var StoryMain = component(function({game, history}) {
  
  //var log = history.map(function(state) {
    //return <PlayerView game={state} key={state.get('turn')}/>
  //}).toArray().reverse()
  //<div>{log}</div>

  return <div>
    <PlayerView game={game}/>
  </div>
})

var PlayerView = component(function({game}) {
  var player = game.get('player')
  var villain = game.get('villain')
  var events = game.get('events')
  var room = Player.playerRoom(game, player)
  var detail = Player.playerDetail(game, player)

  var style = {
    padding: 4
  }

  var page;
  if (events.get('event')) {
    page = <Event event={events.get('event')} player={player}/>
  }

  else if (detail) {
    page = <Details.Focused time={events.get('time')} detail={detail} inventory={player.cursor('inventory')} />
  }

  else {
    page = <PlayerRoomView room={room} player={player} villain={villain}/>
  }

  return <div>
    <EntrySeparator room={room} time={events.get('time')} detail={detail}/>
    <div style={style}>{page}</div>
    <div>{game.get('feedback')}</div>
  </div>
})

var Event = component(function({event, player}) {
  // if you are dead

  var controls;
  if (player.get('dead')) {
    controls = <span>THE END</span>
  }
  else {
    controls = <span><a onClick={Game.onAction(Player.lookAround())}>Look Around</a></span>
  }

  return <div>
    <p>{event}</p>
    <p>{controls}</p>
  </div>
})

var PlayerRoomView = component(function({room, player, villain}) {
  return <div>
    <p>{room.get('description')}</p>
    <p><Details.Main details={room.cursor('details')}/></p>
    <p><VillainFound player={player} villain={villain}/></p>
    <p><Exits room={room} player={player}/></p>
    <p><a onClick={Game.onAction(Player.wait())}>Wait</a></p>
  </div>
    //<p><pre>{JSON.stringify(room.toJS(), null, "  ")}</pre></p>
})

var Exits = component(function({room, player}) {

  function isBack(player, roomId) {
    return player.get('lastRoom') == roomId
  }

  var exits = map(room.get('connections').toJS(), function(connection, id) {
    var label = (isBack(player, id)) ? "Back" : "Go"
    return <div>{label} - <a onClick={Game.onAction(Player.moveTo(id))}>{connection.name}</a></div>
  })

  return <div>{exits}</div>
})

var VillainFound = component(function({player, villain}) {

  // only should see him if he's dead
  if (Villain.isSeen(villain, player)) {
    return <span>The body of the Captain lies on the ground, eyes manic even in death.</span>
  }

  return <span/>
})

var EntrySeparator = component(function({time, room, detail}) {

  var style = {
    backgroundColor: "#333",
    color: "white",
    padding: 4,
  }

  var detailInfo = ""
  if (detail) {
    detailInfo = " - " + detail.get('name')
  }

  return <div style={style}>
    <div>
      <Time time={time}/>
      <span> - </span>
      <span>{room.get('name')}</span>
      <span>{detailInfo}</span>
    </div>
  </div>
})


exports.Main = StoryMain
