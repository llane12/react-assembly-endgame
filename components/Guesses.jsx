import { clsx } from "clsx";
import { GameState } from "../internal/gameState";

export default function Guesses(props) {

    function userGuessed(char) {
        for (let i = 0; i < props.userGuesses.length; i++) {
            if (props.userGuesses[i].char === char) {
                return true;
            }
        }
        return false;
    }

    function getClassName(char) {
        const guessed = userGuessed(char);
        return clsx(
            "guess",
            guessed && "correct",
            !guessed && props.gameState === GameState.LOST && "missed");
    }

    function getContent(char) {
        return userGuessed(char) || props.gameState === GameState.LOST
            ? char
            : null;
    }

    const elements = props.word.split("").map((char, i) => (
        <div key={i} className="guess-box">
            <span className={getClassName(char)}>{getContent(char)}</span>
        </div>
    ));

    return (
        <section className="guesses-container">
            {elements}
        </section>
    )
}
