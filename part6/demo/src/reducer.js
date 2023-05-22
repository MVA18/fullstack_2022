import { combineReducers } from 'redux'
import counterReducer from './reducers/counterReducer'
import noteReducer from "./reducers/noteReducer";

const rootReducer = combineReducers({
    counter: counterReducer,
    notes: noteReducer
})

export default rootReducer