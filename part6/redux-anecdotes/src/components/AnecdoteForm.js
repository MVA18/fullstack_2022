import { connect } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteForm = (props) => {
    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createNewAnecdote(content)
        props.setNotification(`Create anecdote: ${content}`, 5000)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name={'anecdote'}/></div>
                <button type={'submit'}>create</button>
            </form>
        </>
    )
}

const mapDispatchToProps = {
    createNewAnecdote,
    setNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm