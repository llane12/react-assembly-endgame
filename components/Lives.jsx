import Life from "./Life"

export default function Lives(props) {
    const numIncorrectGuesses = props.userGuesses.filter(x => x.occurences === 0).length;

    const elements = props.programmingLanguages.map(lang => (
        <Life
            key={lang.id}
            {...lang}
            userGuesses={props.userGuesses}
            numIncorrectGuesses={numIncorrectGuesses}
        />
    ))

    return (
        <section className="lives-container">
            {elements}
        </section>
    )
}
