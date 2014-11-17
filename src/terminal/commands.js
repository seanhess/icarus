

var commands = {
  help: help,
  status: status,
  init: init,
}

function command(name, f) {
  f.name = name
  return f
}

function commandName(c) {
  return c.name
}

function help() {
  return "Available commands: " + Object.keys(commands).join(", ")
}

function status() {
  return "Systems normal"
}

function init() {
  return "Welcome to Icarus 2.31.3 - Type 'help' for a list of available commands"
}

module.exports = commands

