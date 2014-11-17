var React     = require('react')
var immstruct = require('immstruct')
var component = require('../lib/component')

var ship = require('./ship')
var Player = require('./player')
console.log("GO")

var TERMINAL_WIDTH = 400

var App = component(function({player}) {

  var terminalStyle = {
    backgroundColor: "black", 
    position: "absolute", 
    top: 0, bottom: 0, right: 0, 
    width: TERMINAL_WIDTH
  }

  return <div>
    <StoryPanel player={player}/>
    <div style={terminalStyle}>Terminal</div>
  </div>
})

var StoryPanel = component(function({player}) {
  var style = {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 400,
    marginRight: TERMINAL_WIDTH,
    backgroundColor: "green"
  }

  return <RoomView player={player}/>
})

var RoomView = component(function({player}) {
  console.log("ROOM VIEW", player)
  var room = player.cursor('location')
  return <div>
    <p>{room.get('description')}</p>
    <p><button onClick={onClickMove('hall')}>Move to Hall</button></p>
    <p><button onClick={onClickMove('engineRoom')}>Move to Engine</button></p>
    <p><button onClick={onClickMove('crewQuarters')}>Move to Quarters</button></p>
    <p><button onClick={onClickMove('bridge')}>Move to Bridge</button></p>
  </div>
})

function onClickMove(room) {
  return function() {
    Player.moveTo(room)
  }
}

function render() {
  React.render( 
    <App player={Player.atom.cursor()}/>,
    document.getElementById('main')
  )
}

render();
Player.atom.on('swap', render);
