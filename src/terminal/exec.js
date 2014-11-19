var programs = require('./programs/index')

var commands = {
  help: help,
  status: status,
  init: init,
  mail: mail,
  //"": nothing,
}

function command(name, f) {
  f.name = name
  return f
}

function commandName(c) {
  return c.name
}

function help(program) {
  console.log("help called", program.toJS())
  return "Available commands: " + _.keys(program.toJS().commands)
}

function status() {
  return "Systems normal"
}

function init() {
  return "Welcome to Icarus 2.31.3 - Type 'help' for a list of available commands"
}

function mail() {
  return programs.load("mail")
}

////////////////////////////
// Programs ////////////////
////////////////////////////


function loadProgram(state, program) {
  return state.cursor('currentProgram').update(() => program)
}

function availablePrograms() {  //eventually this will take state into consideration
  return programs
}


function currentProgram(state) {
  return state.get('currentProgram')
}

module.exports = commands

