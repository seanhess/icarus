console.log("HELLO WORLDzzz")


var React     = require('react'),
    immstruct = require('immstruct'),
    component = require('omniscient');

var NameInput = component(function (props) {
  var onChange = function (e) {
    props.cursor.update('name', function (name) {
      return e.currentTarget.value;
    });
  };
  return React.DOM.input({ value: props.cursor.get('name'), onChange: onChange });
});

var Welcome = component(function (props) {
  var guest = props.cursor.get('guest');
  var name = guest.get('name') ? ", " + guest.get('name') : "";
  return React.DOM.p({}, props.cursor.get('greeting'), name, "!",
                         NameInput(guest));
});

var structure = immstruct({ greeting: 'Welcome', guest: { name: '' } });

function render () {
  React.render(
    Welcome(structure.cursor()),
    document.getElementById('main'));
}

render();
structure.on('swap', render);
