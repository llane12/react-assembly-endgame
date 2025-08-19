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
            />
            <Guesses
                programmingLanguages={programmingLanguages}
                word={word}
                userGuesses={userGuesses}
                gameState={gameState}
            />
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
