import Key from "./Key"

export default function Keyboard(props) {
    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    const elements = alphabet.map(c => (
        <Key
            key={c}
            char={c}
            gameState={props.gameState}
            {...props}
        />
    ));
    return (
        <section className="keyboard">
            {elements}
        </section>
    );
}
