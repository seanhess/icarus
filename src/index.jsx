/* @flow */
var React     = require('react')
var immstruct = require('immstruct')
var component = require('../lib/component')

var Game = require('./game')
var Terminal = require('./terminal/Terminal')
var Story = require('./story/Story')
var Status = require('./status/Status')
var History = require('./game/history')
//var test = require('./test')

var RIGHT_PANEL_WIDTH = 500

// App is a flex box container
var App = component(function({terminal, game, history}) {
  var appStyle = {}
  return <div style={appStyle}>
    <StoryPanel 
      game={game} 
      history={history}
    />
    <RightPanel 
      terminal={terminal}
      player={game.cursor('player')}
      game={game}
    />
  </div>
})

var RightPanel = component(function({terminal, player, game}) {

  var style = {
    position: "fixed",
    right: 0,
    top: 0,
    bottom: 0,
    width: RIGHT_PANEL_WIDTH
  }


  //<Debug game={game} />
  return <div style={style}>
    <Terminal.Main terminal={terminal} player={player} game={game}/>
    <Status player={player}/>
  </div>
})

var StoryPanel = component(function({game, history}) {
  var style = {
    backgroundColor: "green",
    marginRight: RIGHT_PANEL_WIDTH
  }

  return <div style={style}>
    <Story.Main game={game} history={history}/>
  </div>
})

var Debug = component(function({game}) {
  var events = game.get('events')
  return <div>
    <h3>Player</h3>
    <p><pre><code>{JSON.stringify(game.get('player').toJS(), null, "  ")}</code></pre></p>
    <h3>Villain</h3>
    <p><pre><code>{JSON.stringify(game.get('villain').toJS(), null, "  ")}</code></pre></p>
    <h3>Other</h3>
    <p>{events.get('distanceToSunDoom')} {events.get('ending')}</p>
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

  //window.scrollTo(0,document.body.scrollHeight);
  //window.scrollTop = window.scrollHeight
}

render();
Terminal.state.on('swap', render);
Game.state.on('swap',render);
History.state.on('swap', render);

