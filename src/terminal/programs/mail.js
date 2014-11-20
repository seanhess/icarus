var ph = require('./program-helper')

function loadText(terminalState, gameState) {
    return "Accessing mail.  You have (1) new message."
}

function isWorking(terminalState, gameState) {
    return true
}


function read(terminalState, gameState) {
    return ph.updates(terminalState, gameState, "I'ma get you.  -- bad guy")
}




var commands = {
    read: read,
}

module.exports = {
    name: "mail",
    commands: commands,
    loadText: loadText,
    isWorking: isWorking,
} 