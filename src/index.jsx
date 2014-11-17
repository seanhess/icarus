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

  return <div style={style}>
    Lorem ipsum dolor sit amet, consectetuer interpretaris nec at, adolescens definiebas est et. Est cu assentior consectetuer, ius ut inani saperet qualisque. Pri ei quot solum luptatum, quaerendum ullamcorper cum no. Ei falli dolor insolens sit. Duo ea illud possim sententiae, enim graeci assentior no nec. Vel verterem oportere qualisque eu, et amet impetus iracundia his.

In eum lorem soleat partiendo, pri ea adhuc virtute evertitur. No ius minimum blandit probatus, his atqui aliquid id. Mel alterum accusam et, duo ea nisl iriure civibus. Essent volutpat pro ne. Sit in omittam moderatius, ius ei unum audire commune. Ad eos periculis accommodare, iriure appareat at sit, at vix tacimates adversarium contentiones.

Duo an saepe veniam dolorum. Ius cu munere oporteat, nibh evertitur ex mel, eos primis laboramus ex. Ne wisi delenit petentium est, est an sumo forensibus. Rebum iusto assueverit ut has.

Nostro facilis te has. Cu vero blandit sed, in malorum insolens vel. Brute ridens usu ei. Qui feugiat consectetuer ei, liber platonem vim ne, ne vidit ipsum pri. Ei vis timeam percipit.

Te vim saepe propriae nominavi. Mel feugait signiferumque et. Mundi qualisque hendrerit et mea. Vide maiorum voluptua nam an, alii falli te quo, vim brute posidonium ad.
  </div>
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
