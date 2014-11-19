var React     = require('react/addons')
var component = require('../../lib/component')
var immstruct = require('immstruct')
var exec = require('./exec')
var mainProgram = require('./programs/index').main

var cx = React.addons.classSet;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var state = immstruct({
  command: "",
  buffer: [exec.init()],
  isOpen: false,
  program: mainProgram
})

var Window = component(function({program, buffer, command, isOpen}) {

  var lines = buffer.toArray().map(function(line) {
    return <div>{line}</div>
  })

  var openStyle = {

  }

  var closedStyle = {

  }

  var classes = cx({
    'terminal-open': isOpen.deref(),
    'terminal-closed': !isOpen.deref(),
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
    runCommand(program, buffer, name)
  }

  function onClick(e) {
    openTerminal()
  }
})


var Main = component(function({terminal}) {
  return <Window 
    program={terminal.cursor('program')}
    buffer={terminal.cursor('buffer')}
    command={terminal.cursor('command')}
    isOpen={terminal.cursor('isOpen')}
  />
})

exports.Window = Window
exports.Main = Main
exports.state = state



function runCommand(program, buffer, name) {
  var result = exec[name](program)
  // needs to operate on the buffer
  buffer.update((list) => {
    return list
      .push("> " + name)
      .push(result)
  })
}


function openTerminal() {
  state.cursor('isOpen').update(() => true)
}

function closeTerminal() {
  state.cursor('isOpen').update(() => false)
}

exports.openTerminal = openTerminal
exports.closeTerminal = closeTerminal
