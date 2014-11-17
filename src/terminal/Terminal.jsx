var React     = require('react')
var component = require('../../lib/component')
var immstruct = require('immstruct')
var commands = require('./commands')

var state = immstruct({
  command: "",
  buffer: [commands.init()],
})

var Window = component(function({buffer, command}) {

  var lines = buffer.toArray().map(function(line) {
    return <div>{line}</div>
  })

  return <div>
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
})


var Main = component(function({terminal}) {
  return <Window 
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
