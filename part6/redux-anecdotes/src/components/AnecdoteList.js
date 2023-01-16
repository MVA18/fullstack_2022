import { useDispatch, useSelector } from "react-redux";
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer";

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
        dispatch(upvoteAnecdote(anecdote))
        dispatch(setNotification(`you voted '${ anecdote.content }'`, 5000))
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