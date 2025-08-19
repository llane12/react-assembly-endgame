import { clsx } from "clsx";

export default function Life(props) {
    const dead = props.numIncorrectGuesses >= props.id;

    const styles = {
        backgroundColor: props.backgroundColor,
        color: props.fontColor
    }

    return (
        <div className="life-container">
            <div className={clsx("life", dead && "dead")} style={styles}>
                <span>{props.name}</span>
            </div>
            {dead && <span className="skull">💀</span>}
        </div>
    )
}
