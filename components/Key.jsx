import { clsx } from "clsx";
import { GameState } from "../internal/gameState"

export default function Key(props) {

    function userGuessed(char) {
        for (let i = 0; i < props.userGuesses.length; i++) {
            const guess = props.userGuesses[i];
            if (guess.char === char) {
                return guess.occurences > 0 ? 1 : -1;
            }
        }
        return 0;
    }

    function getClassName() {
        const guessed = userGuessed(props.char);
        return clsx(
            "key",
            guessed > 0 && "correct",
            guessed < 0 && "incorrect");
    }

    const disabled = props.gameState === GameState.WON || props.gameState === GameState.LOST;

    return (
        <button
            className={getClassName()}
            disabled={disabled}
            aria-disabled={disabled || props.userGuesses.some(g => g.char === props.char)}
            aria-label={`Letter ${props.char}`}
            onClick={() => props.keyPressed(props.char)}
        >
            {props.char}
        </button>
    );
}
