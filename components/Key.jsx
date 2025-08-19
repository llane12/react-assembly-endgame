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
            guessed > 0 && "key-correct",
            guessed < 0 && "key-incorrect");
    }

    function getDisabled() {
        return props.gameState === GameState.WON || props.gameState === GameState.LOST;
    }

    return (
        <button className={getClassName()} disabled={getDisabled()} onClick={() => props.keyPressed(props.char)}>
            {props.char}
        </button>
    );
}
