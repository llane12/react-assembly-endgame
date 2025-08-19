import { useState } from "react"
import Confetti from "react-confetti"

import { GameState, calculateGameState } from "../internal/gameState"
import { programmingLanguages } from "../internal/programmingLanguages"

import StatusBar from "./StatusBar"
import Lives from "./Lives";
import Guesses from "./Guesses"
import Keyboard from "./Keyboard";

export default function Main() {
    const [word, setWord] = useState("REFACTOR");
    const [userGuesses, setUserGuesses] = useState([]);

    const gameState = calculateGameState(userGuesses, word, programmingLanguages.length - 1);
    const numIncorrectGuesses = userGuesses.filter(x => x.occurences === 0).length;
    const guessesRemaining = programmingLanguages.length - numIncorrectGuesses - 1;
    const srCurrentWord = word.split("").map(char => userGuesses.some(g => g.char === char) ? char + "." : "blank.").join(" ")

    function keyPressed(char) {
        if (userGuesses.find(c => c.char === char)) {
            return;
        }
        // Record guess
        let occurences = 0;
        for (let i = 0; i < word.length; i++) {
            if (word.charAt(i) === char) {
                occurences++;
            }
        }
        setUserGuesses(prev => [...prev, { char: char, occurences: occurences }]);
    }

    function newGame() {
        setWord("TESTING");
        setUserGuesses([]);
    }

    return (
        <main>
            <StatusBar
                programmingLanguages={programmingLanguages}
                word={word}
                userGuesses={userGuesses}
                gameState={gameState}
            />
            <Lives
                programmingLanguages={programmingLanguages}
                userGuesses={userGuesses}
                numIncorrectGuesses={numIncorrectGuesses}
            />
            <Guesses
                programmingLanguages={programmingLanguages}
                word={word}
                userGuesses={userGuesses}
                gameState={gameState}
            />

            {/* Screen reader-only section */}
            <section className="sr-only" aria-live="polite" role="status">
                <p>
                    {userGuesses.length > 0
                        ? userGuesses[userGuesses.length - 1].occurences > 0
                            ? `Correct! The letter ${userGuesses[userGuesses.length - 1].char} is in the word.`
                            : `Sorry, the letter ${userGuesses[userGuesses.length - 1].char} is not in the word.`
                        : null
                    }
                </p>
                <p>{`Current word: ${srCurrentWord}`}</p>
                {(gameState !== GameState.WON && gameState === GameState.LOST) && <p>`You have ${guessesRemaining} ${guessesRemaining > 1 ? "attempts" : "attempt"} remaining.`</p>}
            </section>

            <Keyboard
                programmingLanguages={programmingLanguages}
                word={word}
                userGuesses={userGuesses}
                keyPressed={keyPressed}
                gameState={gameState}
            />
            {(gameState === GameState.WON || gameState === GameState.LOST) && (
                <button onClick={newGame} className="new-game">
                    New Game
                </button>
            )}
            {gameState === GameState.WON && <Confetti />}
        </main>
    )
}
