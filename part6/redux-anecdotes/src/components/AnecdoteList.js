import { useDispatch, useSelector } from "react-redux";
import { upvote } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from "../actions/showNotificationWithTimeout";

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector((state => {
        let anecdotes = state.anecdotes
        if(state.filter)
        {
            anecdotes = state.anecdotes.filter(anecdote => {
                return anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
            })
        }
        return anecdotes.slice().sort(function (a, b) {
            return b['votes'] - a['votes']
        })
    }))

    const vote = (anecdote) => {
        dispatch(upvote(anecdote.id))
        showNotificationWithTimeout(dispatch, `you voted '${ anecdote.content }'`)
    }

    return (
        <ul>
            { anecdotes.map(anecdote =>
                <div key={ anecdote.id }>
                    <div>
                        { anecdote.content }
                    </div>
                    <div>
                        has { anecdote.votes }
                        <button onClick={ () => vote(anecdote) }>vote</button>
                    </div>
                </div>
            ) }
        </ul>
    )
}

export default AnecdoteList