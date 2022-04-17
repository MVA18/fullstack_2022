import { useState, useEffect } from 'react'
import ShowCountries from "./components/ShowCountries";
import Filter from "./components/Filter";
import axios from 'axios'


const App = () => {

    const [countries, setCountries] = useState([])
    const [showSingleCountry, setShowSingleCountry] = useState(false)
    const [country, setCountry] = useState(null)
    const [filteredCountries, setFilteredCountries] = useState([])

    const hook = () => { axios.get('https://restcountries.com/v2/all').then(response => { setCountries(response.data) }) }
    useEffect(hook, [])

    const reset = (filteredCountries) => {
        setShowSingleCountry(false)
        setCountry(null)
        setFilteredCountries(filteredCountries)
    }

    return (
        <div>
            <Filter countries={countries} reset={reset} />
            <ShowCountries countries={filteredCountries} showSingleCountry={showSingleCountry} setShowSingleCountry={setShowSingleCountry} country={country} setCountry={setCountry} />
        </div>
    )
}

export default App