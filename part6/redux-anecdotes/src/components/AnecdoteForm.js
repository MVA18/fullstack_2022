import { useDispatch } from "react-redux";
import { create } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from "../actions/showNotificationWithTimeout";
import anecdoteService from "../services/anecdotes";
const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(create(newAnecdote))
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