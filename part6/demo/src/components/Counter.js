import store from "../store";
import addIncrementAction from "../actions/counterActions/addIncrementAction";
import addDecrementAction from "../actions/counterActions/addDecrementAction";
import addResetAction from "../actions/counterActions/addResetAction";

const Counter = () => {
    return (
        <div>
            <div>
                {store.getState().counter}
            </div>
            <button
                onClick={e => store.dispatch(addIncrementAction)}
            >
                plus
            </button>
            <button
                onClick={e => store.dispatch(addDecrementAction)}
            >
                minus
            </button>
            <button
                onClick={e => store.dispatch(addResetAction)}
            >
                zero
            </button>
        </div>
    )
}

export default Counter;