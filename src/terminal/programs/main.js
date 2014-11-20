

module.exports = {
    name: "main",
    commands: {
        echo: function (terminalState, gameState, text) {return {
            newTerminalState: terminalState,
            newGameState: gameState,
            outputText: text
        }}
    },
    loadText: "Welcome to Icarus 2.31.3 - Type 'help' for a list of available commands"
}