import { useState } from 'react'
import Button from "./utils/Button";
import StatisticLine from "./utils/StatisticLine";
import AnecdotesList from "./utils/AnecdotesList";


const Header = ({title}) => {return ( <h1>{title}</h1> )}

const Average = ({good, bad, all}) => {
    const average = (good - bad) / all;
    return ( <StatisticLine title={'average'} value={average}/> )}

const Positive = ({good, all}) => {
    const positive = (good / all) * 100;
    return ( <StatisticLine title={'positive'} value={positive + " %"}/> )}

const Statistics = ({good, bad, neutral, all}) => {
    if (all === 0) {
        return ( <div> No feedback given </div>)
    }
    return (
        <table>
            <tbody>
            <StatisticLine title={'good'} value={good}/>
            <StatisticLine title={'neutral'} value={neutral}/>
            <StatisticLine title={'bad'} value={bad}/>
            <StatisticLine title={'all'} value={all}/>
            <Average good={good} bad={bad} all={all}/>
            <Positive good={good} all={all}/>
            </tbody>
        </table>
    )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0);

  const setState = (stateToSet, value) => {
      setAll(all + 1);
      stateToSet(value + 1);
  }

    return (
      <div>
          <Header title={'give feedback'}/>
          <Button onClick={() => setState(setGood, good)} text='good' />
          <Button onClick={() => setState(setNeutral, neutral)} text='neutral' />
          <Button onClick={() => setState(setBad, bad)} text='bad' />
          <Header title={'statistics'}/>
          <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
          <AnecdotesList/>
      </div>
  )
}

export default App
