var React     = require('react')
var immstruct = require('immstruct')
var component = require('../lib/component')

var ship = require('./ship')
var Player = require('./player')
var Terminal = require('./terminal/Terminal')
var Events = require('./events/events')
var History = require('./history')
var Villain = require('./villain')

var TERMINAL_WIDTH = 400

// App is a flex box container
var App = component(function({player, terminal, events, history, villain}) {
  var appStyle = {}
  return <div style={appStyle}>
    <StoryPanel player={player} events={events} history={history} villain={villain}/>
    <TerminalPanel terminal={terminal}/>
  </div>
})

var TerminalPanel = component(function({terminal}) {
  var terminalStyle = {
    backgroundColor: "black", 
    color: "green",
    position: "fixed",
    right: 0,
    top: 0,
    bottom: 0,
    width: TERMINAL_WIDTH
  }

  return <div style={terminalStyle}>
    <Terminal.Main terminal={terminal}/>
  </div>
})

var StoryPanel = component(function({player, events, history, villain}) {
  var style = {
    backgroundColor: "green",
    marginRight: TERMINAL_WIDTH
  }

  var log = history.toArray().map(function(text) {
    return <p>{text}</p>
  })

  return <div style={style}>
    <div>{log}</div>
    <PlayerView player={player} events={events} villain={villain}/>
    <button onClick={Terminal.openTerminal}>Open Terminal</button>
    <button onClick={Terminal.closeTerminal}>Close Terminal</button>
  </div>
})

var PlayerView = component(function({player, events, villain}) {
  var room = player.cursor('location')

  var villainView = <span/>
  if (Villain.isSeen(player)) {
    villainView = <span>You see the bad guy</span>
  }

  return <p>
    <span>{Events.renderTime(events.get('time'))}</span>
    <span> - </span>
    <LinkParagraph text={room.get('description')}/>
    {villainView}
  </p>
})


var LinkParagraph = component(function({text}) {
  var _text = text.toJS()
  var innerContent = _text.map(function(spanText) {
    if (Array.isArray(spanText)) {
      return React.DOM.a({
        onClick: onClickMove(spanText[1]),
        href: "#"
      }, spanText[0] + " ")
    }
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
  var history  = History.state.cursor()
  var villain  = Villain.state.cursor()

  React.render( 
    <App 
      terminal={terminal} 
      player={player}
      events={events}
      history={history}
      villain={villain}
    />,
    document.getElementById('main')
  )
}

render();
Player.state.on('swap', render);
Terminal.state.on('swap', render);
Events.state.on('swap', render);
History.state.on('swap', render);
Villain.state.on('swap', render);
