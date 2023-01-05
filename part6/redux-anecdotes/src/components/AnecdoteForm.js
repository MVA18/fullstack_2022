import { useDispatch } from "react-redux";
import { create } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from "../actions/showNotificationWithTimeout";
const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(create(content))
        showNotificationWithTimeout(dispatch, `Create anecdote: ${content}`)
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

export default AnecdoteForm