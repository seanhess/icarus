var ph = require('./program-helper')

function loadText(terminalState, gameState) {
    return "ALL SYSTEMS OFFLINE"
}

function isWorking(terminalState, gameState) {
    return false
}



var commands = {
    
}

module.exports = {
    name: "systems",
    commands: () => commands,
    loadText: loadText,
    isWorking: isWorking,
} 