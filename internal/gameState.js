const GameState = Object.freeze({
    START: { id: 1 },
    CORRECT_GUESS: { id: 2 },
    INCORRECT_GUESS: { id: 3 },
    WON: { id: 4 },
    LOST: { id: 5 }
});

function calculateGameState(userGuesses, word, allowedGuesses) {
    if (userGuesses.length == 0) {
        return GameState.START;
    }

    let correctCharacters = 0;
    let incorrectCharacters = 0;
    for (let i = 0; i < userGuesses.length; i++) {
        if (userGuesses[i].occurences === 0) {
            incorrectCharacters++;
        } else {
            correctCharacters += userGuesses[i].occurences;            
        }
    }

    if (incorrectCharacters === allowedGuesses) {
        return GameState.LOST;
    } else if (correctCharacters === word.length) {
        return GameState.WON;
    }

    return userGuesses[userGuesses.length - 1].occurences === 0
        ? GameState.INCORRECT_GUESS
        : GameState.CORRECT_GUESS;
}

export {
    GameState,
    calculateGameState
}
