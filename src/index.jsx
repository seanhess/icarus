var React     = require('react')
var immstruct = require('immstruct')
var component = require('../lib/component')

var ship = require('./ship')
var Game = require('./game')
var Terminal = require('./terminal/Terminal')
var Events = require('./events/events')
var History = require('./history')
var Player = require('./player')
var Villain = require('./villain')


var TERMINAL_WIDTH = 400

// App is a flex box container
var App = component(function({terminal, game, history}) {
  var appStyle = {}
  return <div style={appStyle}>
    <StoryPanel game={game} history={history}/>
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

var StoryPanel = component(function({game, history}) {
  var style = {
    backgroundColor: "green",
    marginRight: TERMINAL_WIDTH
  }

  var log = history.toArray().map(function(text) {
    return <p>{text}</p>
  })

  return <div style={style}>
    <div>{log}</div>
    <PlayerView game={game}/>
    <button onClick={Terminal.openTerminal}>Open Terminal</button>
    <button onClick={Terminal.closeTerminal}>Close Terminal</button>
  </div>
})

var PlayerView = component(function({game}) {
  var player = game.cursor('player')
  var villain = game.cursor('villain')
  var room = player.cursor('location')

  var villainView = <span/>
  if (Villain.isSeen(player, villain)) {
    villainView = <span>You see the bad guy</span>
  }

  return <p>
    <span>{Events.renderTime(game.get('time'))}</span>
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
    var action = Player.moveTo(room)
    Game.runTick(action)
  }
}

function render() {
  var game     = Game.state.cursor()
  var terminal = Terminal.state.cursor()
  var history = History.state.cursor()

  React.render( 
    <App 
      terminal={terminal} 
      game={game}
      history={history}
    />,
    document.getElementById('main')
  )
}

render();
Terminal.state.on('swap', render);
Game.state.on('swap', render);
History.state.on('swap', render);
