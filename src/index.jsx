/* @flow */
var React     = require('react')
var immstruct = require('immstruct')
var component = require('../lib/component')

var Game = require('./game')
var Terminal = require('./terminal/Terminal')
var History = require('./history')
var Story = require('./story/Story')

var TERMINAL_WIDTH = 400

// App is a flex box container
var App = component(function({terminal, game, history}) {
  var appStyle = {}
  return <div style={appStyle}>
    <StoryPanel 
      game={game} 
      history={history}
    />
    <TerminalPanel 
      terminal={terminal}
      player={game.cursor('player')}
      game={game}
    />
  </div>
})

var TerminalPanel = component(function({terminal, player, game}) {
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
    <Terminal.Main terminal={terminal} player={player} game={game}/>
  </div>
})

var StoryPanel = component(function({game, history}) {
  var style = {
    backgroundColor: "green",
    marginRight: TERMINAL_WIDTH
  }

    //<Debug game={game}/>
  return <div style={style}>
    <Story.Main game={game} history={history}/>
  </div>
})

var Debug = component(function({game}) {
  return <div>
    <h3>Player</h3>
    <p><pre><code>{JSON.stringify(game.get('player').toJS(), null, "  ")}</code></pre></p>
    <h3>Rooms</h3>
    <p><pre><code>{JSON.stringify(game.get('rooms').toJS(), null, "  ")}</code></pre></p>
    <h3>Villain</h3>
    <p><pre><code>{JSON.stringify(game.get('villain').toJS(), null, "  ")}</code></pre></p>
  </div>
})


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
Game.state.on('swap',render);
History.state.on('swap', render);
