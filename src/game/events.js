var Immutable = require('immutable')
var moment = require('moment')
var Villain = require('./villain')
var Player = require('./player')

var START_TIME = moment("2084-11-14T02:14Z")
var TURN_DURATION = 60

exports.initialState = function() {
  return Immutable.Map({
    turn: 0,
    time: START_TIME,
    distanceToSunDoom: 100,
    event: null,
    clue: null
  })
}

// TODO calculate actual acceleration and thrust of ship for death
exports.turn = function({events}) {
  events.update('turn', t => t + 1)
  events.update('time', t => t.clone().add(TURN_DURATION*1000))
  events.update('distanceToSunDoom', d => d - 1)
}

var SUN_DOOM = "A light on the terminal near you blinks frantically. The message from the computer is short, but clear: \"We are caught in the sun's pull. It's too late.\". The adrenaline that drove you up to this point dries up, leaving you exhausted. You make your way to a small round window, and see the sun fly past, larger and larger each moment. Your last thoughts are that it has become too bright, and too warm, when your eyes seem too heavy and you sleep."

var ARROW_TO_THE_KNEE = 'You hear a noise behind you and turn swiftly, in time to see a thin man. It is Captain Felt. "I am sorry", he says, as he levels a pistol at you, "We have to fly into the sun. It is the only way.". There is a flash and a roar, and you fall to the floor. Your blood pools around you and in your last moment you hear him walking away, whistling.'

var TRIGGER_HAPPY = 'You hear a noise behind you and turn swifty, in time to see a thin man. It is Captain Felt. "I am sorry", he says, "We have to fly into the sun. It is the only way." He fumbles with a pistol and begins to raise it at you. You are faster. Your pistol fires with a bang and the Captain falls to the floor, dead'

// pass the new one in here?
exports.checkGame = function({events, player, villain, game}) {

  // set event!
  if (events.get('distanceToSunDoom') <= 0) {
    events.set('event', SUN_DOOM)
    player.set('dead', true)
  }

  else if (!villain.get('dead')) {
    if (Villain.isSeen(villain, player)) {
      if (Villain.killsPlayer(villain, player)) {
        events.set('event', ARROW_TO_THE_KNEE)
        player.set('dead', true)
      }
      else {
        events.set('event', TRIGGER_HAPPY)
        villain.set('dead', true)
      }
    }
  }

  // set clue!
  var heardClue = Villain.heardClue(game.get('rooms'), villain, player)
  if (!villain.get('dead') && heardClue) {
    console.log("CLUE!", heardClue, villain.get("action"))
    events.set('clue', Immutable.Map({
      room: heardClue,
      noise: villain.get('action')
    }))
  }
  else {
    events.set('clue', null)
  }
}

exports.renderTime = function(time) {
  return time.format("HH:mm")
  //return time.format("ddd YYYY/MM/DD HH:mm:ss")
}
