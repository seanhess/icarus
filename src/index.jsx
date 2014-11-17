var React     = require('react')
var immstruct = require('immstruct')
var component = require('omniscient')

var ship = require('./ship')
var player = require('./player')
console.log("GO")

var TERMINAL_WIDTH = 400


var App = component(function(props) {
  return <div>
    <StoryPanel />
    <div style={{backgroundColor: "black", position: "absolute", top: 0, bottom: 0, right: 0, width: TERMINAL_WIDTH}}>Terminal</div>
  </div>
})

var StoryPanel = component(function(props) {

  var style = {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    marginRight: TERMINAL_WIDTH,
    backgroundColor: "green"
  }

  return <RoomView player={player}/>
})

var RoomView = component(function({player}) {
  var room = player.get('location')
  return <div>{room.get('description')}</div>
})


//var NameInput = component(function (props) {
  //var onChange = function (e) {
    //props.cursor.update('name', function (name) {
      //return e.currentTarget.value;
    //});
  //};
  //return React.DOM.input({ value: props.cursor.get('name'), onChange: onChange });
//});

//var Welcome = component(function (props) {
  //var guest = props.cursor.get('guest');
  //var name = guest.get('name') ? ", " + guest.get('name') : "";
  //return React.DOM.p({}, props.cursor.get('greeting'), name, "!",
                         //NameInput(guest));
//});

//var structure = immstruct({ greeting: 'Welcome', guest: { name: '' } });

function render() {
  React.render( 
    App(),
    document.getElementById('main')
  )
}

render();
//structure.on('swap', render);
