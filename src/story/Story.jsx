var React     = require('react')
var component = require('../../lib/component')

var Ship = require('../ship')
var Game = require('../game')
var Terminal = require('../terminal/Terminal')
var Events = require('../events/events')
var Player = require('../player')
var Villain = require('../villain')
var Details = require('./Details')
var Time = require('./Time')
var {showStyle} = require('../../lib/render')
var {assign, map} = require('lodash')

var StoryMain = component(function({game}) {
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

  var showDetails        = assign(showStyle(!detail))
  var showFocusedDetails = showStyle(detail)

  return <div>
    <EntrySeparator room={room} time={game.get('time')} />
    <div style={style}>
      <div style={showDetails}>
        <PlayerRoomView room={room} player={player} villain={villain}/>
      </div>
      <div style={showFocusedDetails}>
        <Details.Focused time={game.get('time')} detail={detail}/>
      </div>
    </div>
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
    return <div>Exit - <a onClick={onClickMove(id)}>{connection.name}</a></div>
  })

  return <p>
    <div>{exits}</div>
  </p>
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


function onClickMove(room) {
  return function() {
    var action = Player.moveTo(room)
    Game.runTick(action)
  }
}


exports.Main = StoryMain
