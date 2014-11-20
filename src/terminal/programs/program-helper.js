function updates(terminalState, gameState, outputText) {
  return {
    newTerminalState: terminalState,
    newGameState: gameState,
    outputText: outputText
  }
}

function terminalError(terminalState, gameState, errorText) {
  return updates(terminalState, gameState, errorText)
}

module.exports = {
    updates: updates,
    terminalError: terminalError,
}