var React     = require('react')
var component = require('../../lib/component')

var Ship = require('../ship/ship')
var Game = require('../game')
var Terminal = require('../terminal/Terminal')
var Events = require('../events/events')
var Player = require('../player')
var Villain = require('../villain')
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
  var room = Player.playerRoom(game, player)
  var detail = Player.playerDetail(game, player)

  var style = {
    padding: 4
  }

  //var showDetails        = assign(showStyle(!detail))
  //var showFocusedDetails = showStyle(detail)

  var page;
  if (detail) {
    page = <div>
      <Details.Focused time={game.get('time')} detail={detail}/>
    </div>
  }

  else {
    page = <div>
      <PlayerRoomView room={room} player={player} villain={villain}/>
    </div>
  }

  return <div>
    <EntrySeparator room={room} time={game.get('time')} />
    <div style={style}>{page}</div>
  </div>
})

var PlayerRoomView = component(function({room, player, villain}) {
  return <div>
    <p>{room.get('description')}</p>
    <p><Exits room={room}/></p>
    <p><Details.Main details={room.cursor('details')}/></p>
    <p><VillainFound player={player} villain={villain}/></p>
  </div>
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

var EntrySeparator = component(function({time, room}) {

  var style = {
    backgroundColor: "#333",
    color: "white",
    padding: 4,
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
