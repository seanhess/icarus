var React     = require('react/addons')
var component = require('../../lib/component')
var immstruct = require('immstruct')
var exec = require('./exec')
var mainProgram = require('./programs/index').main

var cx = React.addons.classSet;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var state = immstruct({
  command: "",
  buffer: [],
  isOpen: false,
  program: mainProgram
})

var Window = component(function({program, buffer, command, isOpen}) {

  var lines = buffer.toArray().map(function(line) {
    return <div>{line}</div>
  })

  var programName = program.toJS().name

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
    command.update(() => "")
    runCommand(state, buffer, name)
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



function runCommand(state, buffer, name) {
  var progName = state.cursor("program").get("name")
  var prog = state.cursor().toJS()
  var result = exec[name](state)
  console.log("progName", progName, prog)
  buffer.update((list) => {
    return list
      .push(progName+ "> " + name)
      .push(result)
  })
}


function openTerminal() {
  runCommand(state, state.cursor('buffer'), "init")
  state.cursor('isOpen').update(() => true)
}

function closeTerminal() {
  state.cursor('isOpen').update(() => false)
}

exports.openTerminal = openTerminal
exports.closeTerminal = closeTerminal
