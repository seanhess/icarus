var programs = require('./programs/index')
var Immutable = require('immutable')
// var commands = {

// }

var baseCommands = {
  help: help,
  // init: init,
  load: load,
  quit: quit,
}

function exec(terminalState, gameState, commandName, args) {
    
  var commands = availableCommands(terminalState, gameState)

  if (!_.has(commands, commandName)) {
    return terminalError(terminalState, gameState, "Command does not exist")
  }
  else {
    return commands[commandName](terminalState, gameState, args)
  }
}


function availableCommands(terminalState, gameState) {
  return _.assign(terminalState.getIn(['program', 'commands']).toJS(), baseCommands)
}

function availablePrograms(terminalState, gameState) {
  return programs  // for now, all programs are available.
}

function terminalError(terminalState, gameState, errorText) {
  return updatedState(terminalState, gameState, errorText)
}

function updatedState(terminalState, gameState, outputText) {
  return {
    newTerminalState: terminalState,
    newGameState: gameState,
    outputText: outputText
  }
}



//////////////////////
/// BASE COMMANDS ////
//////////////////////


function load(terminalState, gameState, args) {
  var [programName] = args
  if (!programName || !_.has(availablePrograms(terminalState, gameState), programName)) {
    return terminalError(terminalState, gameState, "Program unavailable.")
  } else {
    var program = programs[programName]
    return updatedState(
      terminalState.set('program', Immutable.fromJS(program)),
      gameState,
      program.loadText
    )
  }
}

function quit(terminalState, gameState) {
  return load(terminalState, gameState, [programs.main.name])
}

function help(terminalState, gameState, args) {
  var [command] = args
  var commands = _.keys(availableCommands(terminalState, gameState)).join(", ")
  return updatedState(terminalState, gameState, "Available commands: " + commands + " ")
}

module.exports = exec

