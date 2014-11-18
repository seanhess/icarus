var React     = require('react')
var immstruct = require('immstruct')
var component = require('../lib/component')

var ship = require('./ship')
var Player = require('./player')
var Terminal = require('./terminal/Terminal')
var Events = require('./events/events')

var TERMINAL_WIDTH = 400

// App is a flex box container
var App = component(function({player, terminal, events}) {
  var appStyle = {}
  return <div style={appStyle}>
    <StoryPanel player={player} events={events}/>
    <TerminalPanel terminal={terminal}/>
  </div>
})

var TerminalPanel = component(function({terminal}) {
  var terminalStyle = {
    backgroundColor: "black", 
    color: "green",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: TERMINAL_WIDTH
  }

  return <div style={terminalStyle}>
    <Terminal.Main terminal={terminal}/>
  </div>
})

var StoryPanel = component(function({player, events}) {
  var style = {
    backgroundColor: "green",
    marginRight: TERMINAL_WIDTH
  }

  return <div style={style}>
    <RoomView player={player} events={events}/>
  </div>
})

var RoomView = component(function({player, events}) {
  var room = player.cursor('location')
  return <div>
    <span>{Events.renderTime(events.get('time'))}</span>
    <span> - </span>
    <LinkParagraph text={room.get('description')}/>
  </div>
})


var LinkParagraph = component(function({text}) {
  var _text = text.toJS()
  var innerContent = _text.map(function(spanText) {
    if (Array.isArray(spanText)) return React.DOM.a({onClick:onClickMove(spanText[1])}, spanText[0] + " ")
    else return React.DOM.span(null, spanText + " ")
  })
  return React.DOM.span(null, innerContent)
})

function onClickMove(room) {
  return function() {
    Player.moveTo(room)
  }
}

function render() {
  var player   = Player.state.cursor()
  var terminal = Terminal.state.cursor()
  var events   = Events.state.cursor()

  React.render( 
    <App 
      terminal={terminal} 
      player={player}
      events={events}
    />,
    document.getElementById('main')
  )
}

render();
Player.state.on('swap', render);
Terminal.state.on('swap', render);
Events.state.on('swap', render);
