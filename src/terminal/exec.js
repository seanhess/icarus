var programs = require('./programs/index')
var ph = require('./programs/program-helper')
var Immutable = require('immutable')

var baseCommands = {
  help: help,
  quit: quit,
}

function run(terminalState, gameState, commandName, args) {
    
  var commands = availableCommands(terminalState, gameState)

  if (!_.has(commands, commandName)) {
    return ph.terminalError(terminalState, gameState, "Command does not exist")
  }
  else {
    return commands[commandName](terminalState, gameState, args)
  }
}

function availableCommands(terminalState, gameState) {
  return _.assign(terminalState.getIn(['program', 'commands']).toJS(), baseCommands)
}

function availablePrograms(terminalState, gameState) {
  return allPrograms()  // for now, all programs are available.
}

function allPrograms() {
  return _.assign(programs, {main: mainProgram()})
}



//////////////////////
/// BASE COMMANDS ////
//////////////////////


function quit(terminalState, gameState) {
  return loadFunction(mainProgram())(terminalState, gameState)
}

function help(terminalState, gameState, args) {
  var [command] = args
  var commands = _.keys(availableCommands(terminalState, gameState)).join(", ")
  return ph.updates(terminalState, gameState, "Available commands: " + commands + " ")
}


////////////////////////
// MAIN PROGRAM ////////
////////////////////////

function mainProgram() {  // We don't have main with the other programs to avoid weird dependencies (it's a little different)
  
  var commands = {
    mail: loadFunction(programs.mail),
    echo: echo,
  }

  return {
    name: "main",
    commands: commands,
    isWorking: () => true,
    loadText: () => "Welcome to Icarus 2.31.3 - Type 'help' for a list of available commands"
  }

  function echo (terminalState, gameState, text) {
    return ph.updates(terminalState, gameState, text)
  }
}


function loadFunction(program) {
  return function (terminalState, gameState) {
    if (!_.has(availablePrograms(terminalState, gameState), program.name)) {
      return ph.terminalError(terminalState, gameState, "Program unavailable.")
    } else {
      return ph.updates(
        terminalState.set('program', Immutable.fromJS(program)),
        gameState,
        program.loadText(terminalState, gameState)
      )
    }
  }
}


module.exports = {
  run: run,
  mainProgram: mainProgram,
}

