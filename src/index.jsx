var React     = require('react')
var immstruct = require('immstruct')
var component = require('../lib/component')

var ship = require('./ship')
var Player = require('./player')
console.log("GO")

var TERMINAL_WIDTH = 400


// App is a flex box container
var App = component(function({player}) {

  var appStyle = {

  }

  return <div style={appStyle}>
    <StoryPanel player={player}/>
    <TerminalPanel />
  </div>
})

var TerminalPanel = component(function() {
  var terminalStyle = {
    backgroundColor: "black", 
    color: "green",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: TERMINAL_WIDTH
  }

  return <div style={terminalStyle}>Terminal</div>
})

var StoryPanel = component(function({player}) {
  var style = {
    backgroundColor: "green",
    marginRight: TERMINAL_WIDTH
  }

  return <div style={style}>
    <RoomView player={player}/>
  </div>
})

var RoomView = component(function({player}) {
  console.log("ROOM VIEW", player)
  var room = player.cursor('location')
  return <div>
    <LinkParagraph text={room.get('description')}/>
    <p><button onClick={onClickMove('hall')}>Move to Hall</button></p>
    <p><button onClick={onClickMove('engineRoom')}>Move to Engine</button></p>
    <p><button onClick={onClickMove('crewQuarters')}>Move to Quarters</button></p>
    <p><button onClick={onClickMove('bridge')}>Move to Bridge</button></p>
  </div>
})

var LinkParagraph = component(function({text}) {
  var _text = text.toJS()
  var innerContent = _text.map(function(spanText) {
    if (Array.isArray(spanText)) return React.DOM.a({href:spanText[1]}, spanText[0] + " ")
    else return React.DOM.span(null, spanText + " ")
  })
  return React.DOM.p(null, innerContent)
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
