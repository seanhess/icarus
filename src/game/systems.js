var Immutable = require('immutable')

// TODO change this state when they interact with a detail (fix something)

// EXAMPLE: on start ->
// the breaker in the communication hub has flipped. You need to reset it.
// go to communication hub
// "You see a closet"
// "You tubes containing bundles of coated wires, and a large panel labeled "Communication Power Breaker". It is disabled (disengaged)"
// flip the switch -> it enables / disables the pluggedIn state here
  
exports.initialState = function() {
  return Immutable.Map({
    plugged: false,
    sensors: false,
  })
}

//exports.is

// TODO need some kind of story state... 
// page names?
// then we can attach them to different components
// if it gets changed to ROOM then show the room instead of just hitting next ->

 //what does it SAY based on the given state
 //what MESSAGE_STATE is it in based on the current state?

//exports.message = function(state) {
   //if unplugged, then... 
   //I need systems that can be fixed by fixing a detail
   //or do you fix the detail itself?
  //return exports.BLIND
//}

//exports.BLIND = "blind"

// hmm... I'm mixing my view layers now.
// oh! use constants, then make a view that corresponds?
//var START = <div>
  //<p>lkajsdf</p>
  //<p>Woot</p>
//</div>
