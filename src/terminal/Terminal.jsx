var React     = require('react/addons')
var component = require('../../lib/component')
var immstruct = require('immstruct')
var _         = require('lodash')

var exec = require('./exec')

var Ship = require('../ship')
var Details = require('../ship/details')
var Player = require('../game/player')

var cx = React.addons.classSet;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var state = immstruct({
  command: "",
  buffer: [exec.mainProgram().loadText()],
  isOpen: false,
  program: exec.mainProgram()
})
// program: name, available commands

var Window = component(function({game, terminal, program, buffer, command, isOpen, player}) {

  var lines = buffer.toArray().map(function(line) {
    return <div key={line}>{line}</div>
  })

  var programName = program.toJS().name

  var openStyle = {

  }

  var closedStyle = {

  }

  var isOpen = isTerminalOpen(Player.playerDetail(game, player))

  var classes = cx({
    'terminal-open': isOpen,
    'terminal-closed': !isOpen
  });

  return <div className={classes}>
    <div>{lines}</div>
    <form onSubmit={onCommand}>
      <span>{programName}&gt;</span>
      <input value={command.deref()} onChange={onCommandChange}/>
    </form>
  </div>

  function onCommandChange(e) {
    command.update((v) => e.target.value)
  }

  function onCommand(e) {
    e.preventDefault()
    var name = command.deref()
    runCommand(terminal, game, name, null)  //todo: add args
  }

  function onClick(e) {
    openTerminal()
  }
})


var Main = component(function({terminal, player, game}) {

  var style = {
    fontFamily: "monospace",
    backgroundColor: "black", 
    color: "green",
  }

  return <div style={style}>
    <Window 
      player={player}
      buffer={terminal.cursor('buffer')}
      command={terminal.cursor('command')}
      game={game}
      terminal={terminal}
      program={terminal.cursor('program')}
    />
  </div>
})

exports.Window = Window
exports.Main = Main
exports.state = state



function runCommand(terminalState, gameState, commandText) {
  var inputs = commandText.split(" ")
  var command = _.first(inputs)
  var args = _.rest(inputs)
  var currentProgramName = terminalState.getIn(['program', 'name'])

  var {newTerminalState, newGameState, outputText} = exec.run(terminalState.deref(), gameState.deref(), command, args)
  
  terminalState.update(() => clearCommand(updateBuffer(newTerminalState, currentProgramName, commandText, outputText))) 
  gameState.update(() => newGameState)

  function clearCommand(terminalState) {
    return terminalState.set('command', "")
  }

  function updateBuffer(terminalState, programName, commandText, outputText) {
    return terminalState.updateIn(['buffer'], (buff) => {
      return buff
        .push(programName+"> " + commandText)
        .push(outputText)
    })
  }
}

function isTerminalOpen(detail) {
  if (!detail) return false
  return (
    detail.get('type') == Details.TERMINAL && 
    Details.isWorking(detail)
  )
}

