import { connect } from "react-redux";
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
    const anecdotes = () => {
        let anecdotes = props.anecdotes
        if (props.filter) {
            anecdotes = props.anecdotes.filter(anecdote => {
                return anecdote.content.toLowerCase().includes(props.filter.toLowerCase())
            })
        }
        return anecdotes.slice().sort(function (a, b) {
            return b['votes'] - a['votes']
        })
    }

    const vote = (anecdote) => {
        props.upvoteAnecdote(anecdote)
        props.setNotification(`you voted '${ anecdote.content }'`, 5000)
    }

    return (
        <ul>
            { anecdotes().map(anecdote =>
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    upvoteAnecdote,
    setNotification,
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList