import Life from "./Life"

export default function Lives(props) {
    const elements = props.programmingLanguages.map(lang => (
        <Life
            key={lang.id}
            {...lang}
            userGuesses={props.userGuesses}
            numIncorrectGuesses={props.numIncorrectGuesses}
        />
    ))

    return (
        <section className="lives-container">
            {elements}
        </section>
    )
}
