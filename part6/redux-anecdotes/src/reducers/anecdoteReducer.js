import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        upvote(state, action) {
            state.filter(anecdote => {
                anecdote.votes = anecdote.id === action.payload ? anecdote.votes = anecdote.votes + 1 : anecdote.votes
                return anecdote
            })
        },
        create(state, action) {
            state.push(action.payload)
        },
        set(state, action)
        {
            return action.payload
        }
    },
})

export const { upvote, create, set } = anecdoteSlice.actions
export default anecdoteSlice.reducer