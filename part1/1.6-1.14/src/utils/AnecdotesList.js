import { useState } from 'react'
import Button from "./Button";

const Header = ({title}) => {return ( <h1>{title}</h1> )}

const Vote = ({updateVote, vote}) =>
{
    return (
        <>
            <p>has {vote} votes</p>
            <Button onClick={updateVote} text='vote' />
        </>
    )
}

const HighestRatedAnecdote = ({anecdotes, points}) => {

    const getMax = points => {
        return Object.keys(points).filter(x => {
            return points[x] === Math.max.apply(null,
                Object.values(points));
        });
    };

    let rank = getMax(points)

    if(rank.length > 1) {
        rank = rank[0];
    }

    return (
        <p>{anecdotes[rank]}</p>
    );
}

const AnecdotesList = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)

    const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

    const increaseByOne = () => {
        const copy = { ...points };
        copy[selected] += 1;
        setPoints(copy);
    }

    return (
        <div>
            <Header title={'Anecdote of the day'}/>
            <p>{anecdotes[selected]}</p>
            <Vote updateVote={increaseByOne} vote={points[selected]}/>
            <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text='next anecdote' />
            <Header title={'Anecdote with most votes'}/>
            <HighestRatedAnecdote anecdotes={anecdotes} points={points}/>
        </div>
    )
}

export default AnecdotesList