import { clsx } from "clsx";
import { GameState } from "../internal/gameState";
import { getObituaryText } from "../internal/utils";

export default function StatusBar(props) {

    function getClassName() {
        return clsx(
            "status-bar",
            props.gameState === GameState.INCORRECT_GUESS && "incorrect",
            props.gameState === GameState.WON && "won",
            props.gameState === GameState.LOST && "lost"
        );
    }

    function getMessage() {
        let numIncorrectGuesses = 0;
        for (let i = 0; i < props.userGuesses.length; i++) {
            if (props.userGuesses[i].occurences === 0) {
                numIncorrectGuesses++;
            }
        }
        return numIncorrectGuesses > 0
            ? `"${getObituaryText(props.programmingLanguages[numIncorrectGuesses - 1].name)}"`
            : null;
    }

    return (
        <section className={getClassName()}>
            {props.gameState === GameState.WON && <h2>You win!</h2>}
            {props.gameState === GameState.WON && <p>Well done! 🎉</p>}

            {props.gameState === GameState.LOST && <h2>Game over!</h2>}
            {props.gameState === GameState.LOST && <p>You lose! Better start learning Assembly 😭</p>}

            {props.gameState === GameState.INCORRECT_GUESS && <p className="incorrect-guess-message">{getMessage()}</p>}
        </section>
    );
}
