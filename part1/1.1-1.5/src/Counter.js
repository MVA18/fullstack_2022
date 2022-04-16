
import { useState } from 'react'
import Display from "./utils/Display";
import Button from "./utils/Button";

const Counter = () => {
    const [ counter, setCounter ] = useState(0)

    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)

    return (
        <div>
            <Display counter={counter}/>
            <Button onClick={increaseByOne} text='plus'/>
            <Button onClick={setToZero} text='zero'/>
            <Button onClick={decreaseByOne} text='minus'/>
        </div>

    )
}
export default Counter