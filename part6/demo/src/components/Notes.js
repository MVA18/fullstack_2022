import store from "../store";

store.dispatch({
    type: 'NEW_NOTE',
    data: {
        content: 'the app state is in redux store',
        important: true,
        id: 1
    }
})

store.dispatch({
    type: 'NEW_NOTE',
    data: {
        content: 'state changes are made with actions',
        important: false,
        id: 2
    }
})

const Notes = () => {
    return(
        <div>
            <ul>
                {store.getState().notes.map(note=>
                    <li key={note.id}>
                        {note.content} <strong>{note.important ? 'important' : ''}</strong>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Notes