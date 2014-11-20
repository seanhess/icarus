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
    console.log("commands", terminalState.getIn(['program', 'commands'])(terminalState, gameState))
  return _.assign(terminalState.getIn(['program', 'commands'])(terminalState, gameState), baseCommands)
}

function availablePrograms(terminalState, gameState) {
  return _.pick(allPrograms(), (program) => program.isWorking(terminalState, gameState))
}

function unavailablePrograms(terminalState, gameState) {
  var availables = availablePrograms(terminalState, gameState)
  return _.pick(allPrograms(), (program) => !!availables[program.name])
}

function allPrograms() {
  return _.assign(programs, {main: mainProgram()})
}



//////////////////////
/// BASE COMMANDS ////
//////////////////////
// These are always available

function quit(terminalState, gameState) {
  return loadFunction(mainProgram())(terminalState, gameState)
}

function help(terminalState, gameState, args) {
  var [command] = args
  var commands = stringifyKeys(availableCommands(terminalState, gameState)) 
  return ph.updates(terminalState, gameState, "Available commands: " + commands + " ")
}


////////////////////////
// MAIN PROGRAM ////////
////////////////////////

function mainProgram() {  // We don't have main with the other programs to avoid weird dependencies (it's a little different)
  
  // var commands = {
  //   mail: loadFunction(programs.mail),
  //   systems: loadFunction(programs.systems),
  //   status: status,
  //   echo: echo,
  // }

  function availableCommands(terminalState, gameState) {
    var c = {}
    if (programs.systems.isWorking(terminalState, gameState)) c["systems"] = loadFunction(programs.systems)
    if (programs.mail.isWorking(terminalState, gameState)) c["mail"] = loadFunction(programs.mail)
    c["echo"] = echo
    c["status"] = status
    return c
  }

  return {
    name: "main",
    commands: availableCommands,
    isWorking: () => true,
    loadText: () => "Welcome to Icarus 2.31.3 - Type 'help' for a list of available commands"
  }

  function echo (terminalState, gameState, text) {
    return ph.updates(terminalState, gameState, text)
  }

  function status(terminalState, gameState) {
    var text = "Some systems are damaged.  The following programs are unavailable: " + stringifyKeys(unavailablePrograms(terminalState, gameState))
    return ph.updates(terminalState, gameState, text)
  }
}


function stringifyKeys(hashMap) {
  return _.keys(hashMap).join(", ")
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

