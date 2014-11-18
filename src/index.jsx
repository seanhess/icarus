var React     = require('react')
var immstruct = require('immstruct')
var component = require('../lib/component')

var dijkstra = require('./dijkstra')

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

  var log = history.toArray().map(function(state) {
    console.log("LOG", state.get('time').format("mm:ss"))
    return <PlayerView game={state} makeLink={killLink}/>
  })

  return <div style={style}>
    <div>{log}</div>
    <PlayerView game={game} makeLink={makeLinkMove}/>
    <button onClick={Terminal.openTerminal}>Open Terminal</button>
    <button onClick={Terminal.closeTerminal}>Close Terminal</button>
  </div>
})

var PlayerView = component(function({game, makeLink}) {
  var player = game.cursor('player')
  var villain = game.cursor('villain')
  var room = player.cursor('location')

  var villainView = <span/>
  if (Villain.isSeen(player, villain)) {
    villainView = <span>You see the bad guy</span>
  }

  return <p>
    <span>{game.get('turn')} - </span>
    <span>{Events.renderTime(game.get('time'))}</span>
    <span> - </span>
    <LinkParagraph text={room.get('description')} makeLink={makeLink}/>
    {villainView}
  </p>
})

// store the old STATE in history

var LinkParagraph = component(function({text, makeLink}) {
  var _text = text.toJS()
  var innerContent = _text.map(function(spanText) {
    if (Array.isArray(spanText)) {
      var href = spanText[1]
      var text = spanText[0]
      return React.DOM.a(makeLink(href), text + " ")
    }
    else return React.DOM.span(null, spanText + " ")
  })
  return React.DOM.span(null, innerContent)
})

function makeLinkMove(href) {
  return {
    onClick: onClickMove(href),
    href: "#"
  }
}

function killLink() {
  return {}
}

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
