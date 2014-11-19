var programs = require('./programs/index')

var commands = {
  help: help,
  status: status,
  init: init,
  mail: mail,
  main: main,
  quit: quit,
  //"": nothing,
}

function command(name, f) {
  f.name = name
  return f
}

function commandName(c) {
  return c.name
}

function help(state) {
  console.log(availablePrograms())
  return "Available commands: " + _.keys(availablePrograms().commands)
}

function status() {
  return "Systems normal"
}

function init(state) {
  return load(state, programs.main)
}

function mail(state) {
  return load(state, programs.mail)
}

function main(state) {
  return load(state, programs.main)
}

function quit(state) {
  return load(state, programs.main)
}

////////////////////////////
// Programs ////////////////
////////////////////////////


function load(state, program) {
  state.cursor("program").update(function() {return program})
  return program.loadText
}

function availablePrograms() {  //eventually this will take state into consideration
  return programs
}


function currentProgram(state) {
  return state.cursor('program').toJS()
}

module.exports = commands

