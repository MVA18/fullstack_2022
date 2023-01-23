import anecdoteService from '../services/anecdotes'
import {createSlice} from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        upvote(state, action) {
            state.filter(anecdote => {
                if (anecdote.id === action.payload.id) {
                    anecdote.votes++
                }
                return anecdote
            })
        },
        create(state, action) {
            state.push(action.payload)
        },
        set(state, action) {
            return action.payload
        }
    },
})

export const {create, upvote, set} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(set(anecdotes))
    }
}

export const createNewAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(create(newAnecdote))
    }
}

export const upvoteAnecdote = anecdote => {
    return async dispatch => {
        let updateAnecdote = {...anecdote}
        updateAnecdote.votes++
        await anecdoteService.upvote(updateAnecdote).then((anecdote) => {
            dispatch(upvote(anecdote))
        })
    }
}
export default anecdoteSlice.reducer