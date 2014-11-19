var React     = require('react/addons')
var component = require('../../lib/component')
var immstruct = require('immstruct')
var commands = require('./commands')

var Ship = require('../ship')

var cx = React.addons.classSet;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var state = immstruct({
  command: "",
  buffer: [commands.init()],
})

var Window = component(function({buffer, command, player, game}) {

  var lines = buffer.toArray().map(function(line) {
    return <div>{line}</div>
  })

  var openStyle = {

  }

  var closedStyle = {

  }

  var isOpen = isTerminalOpen(player)

  var classes = cx({
    'terminal-open': isOpen,
    'terminal-closed': !isOpen
  });

  return <div className={classes}>
    <div>{lines}</div>
    <form onSubmit={onCommand}>
      <span>&gt;</span>
      <input value={command.deref()} onChange={onCommandChange}/>
    </form>
  </div>

  function onCommandChange(e) {
    command.update((v) => e.target.value)
  }

  function onCommand(e) {
    e.preventDefault()
    var name = command.deref()
    command.update(() => "")
    runCommand(buffer, name)
  }

  function onClick(e) {
    openTerminal()
  }
})


var Main = component(function({terminal, player}) {
  return <Window 
    player={player}
    buffer={terminal.cursor('buffer')}
    command={terminal.cursor('command')}
  />
})

exports.Window = Window
exports.Main = Main
exports.state = state



function runCommand(buffer, name) {
  var command = commands[name]
  var result = command()
  // needs to operate on the buffer
  buffer.update((list) => {
    return list
      .push("> " + name)
      .push(result)
  })
}

function isTerminalOpen(detail) {
  if (!detail) return false
  return (
    detail.get('type') == "terminal" && 
    Ship.detailIsEnabled(detail)
  )
}

