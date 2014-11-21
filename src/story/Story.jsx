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
  if (events.get('ending')) {
    page = <Ending ending={events.get('ending')}/>
  }

  else if (detail) {
    page = <Details.Focused time={events.get('time')} detail={detail}/>
  }

  else {
    page = <PlayerRoomView room={room} player={player} villain={villain}/>
  }

  return <div>
    <EntrySeparator room={room} time={events.get('time')} detail={detail}/>
    <div style={style}>{page}</div>
  </div>
})

var Ending = component(function({ending}) {
  return <div>
    <p>{ending}</p>
    <p>THE END</p>
  </div>
})

var PlayerRoomView = component(function({room, player, villain}) {
  return <div>
    <p>{room.get('description')}</p>
    <p><VillainFound player={player} villain={villain}/></p>
    <p><Details.Main details={room.cursor('details')}/></p>
    <p><Exits room={room}/></p>
  </div>
    //<p><pre>{JSON.stringify(room.toJS(), null, "  ")}</pre></p>
})

var Exits = component(function({room}) {

  var exits = map(room.get('connections').toJS(), function(connection, id) {
    return <div>Exit - <a onClick={Game.onAction(Player.moveTo(id))}>{connection.name}</a></div>
  })

  return <div>{exits}</div>
})


var VillainFound = component(function({player, villain}) {
  if (Villain.isSeen(player, villain)) {
    return <span>You see the bad guy</span>
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
