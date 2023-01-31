import Anecdote from "./Anecdote";
import {Link} from "react-router-dom"

const AnecdoteList = ({anecdotes}) => {

    return (
        <div>
            <h2>Anecdotes</h2>
            <ul>
                { anecdotes.map(anecdote =>
                    <Link key={ anecdote.id } to={ `/anecdotes/${ anecdote.id }` }>
                        <Anecdote anecdote={ anecdote }/>
                    </Link>) }
            </ul>
        </div>
    )
}
export default AnecdoteList