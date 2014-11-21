var React     = require('react')
var component = require('../lib/component')

var StatusPanel = component(function({player}) {
  return <div>
    <Inventory inventory={player.cursor('inventory')}/>
  </div>
})

var Inventory = component(function({inventory}) {

  var items = inventory.toArray().map(function(detail) {
    return <li>{detail.get('name')}</li>
  })

  return <div>
    <ul>{items}</ul>
  </div>
})

module.exports = StatusPanel
