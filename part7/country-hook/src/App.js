import React, {useState, useEffect} from 'react'
import axios from 'axios'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const useCountry = (name) => {
    const [country, setCountry] = useState({
        name: null,
        population: null,
        capital: null,
        flag: null,
        found: null,
    })

    async function fetchCountry() {
        if (name) {
            let apiRes = null
            try {
                apiRes = await axios.get(`https://restcountries.com/v3.1/name/${ name }`);
            } catch (err) {
                console.error("Error response:");
                console.error(err.response);
                if (err.response.status === 404) {
                    setCountry({
                        found: false
                    })
                }
            } finally {
                if (apiRes) {
                    if (apiRes.status === 200) {
                        const country = apiRes.data[0]
                        setCountry({
                            name: country.name.official,
                            population: country.population,
                            capital: country.capital[0],
                            flag: country.flags.svg,
                            found: true,
                        })
                    }
                }
            }
        }
    }

    useEffect( () => {
        fetchCountry()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name])

    return country
}

const Country = ({country}) => {
    if (country.found === null) {
        return null
    }

    if (!country.found) {
        return (
            <div>
                not found...
            </div>
        )
    }

    return (
        <div>
            <h3>{ country.name } </h3>
            <div>capital { country.capital } </div>
            <div>population { country.population }</div>
            <img src={ country.flag } height='100' alt={ `flag of ${ country.name }` }/>
        </div>
    )
}

const App = () => {
    const nameInput = useField('text')
    const [name, setName] = useState('')
    const country = useCountry(name)

    const fetch = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return (
        <div>
            <form onSubmit={ fetch }>
                <input { ...nameInput } />
                <button>find</button>
            </form>

            <Country country={ country }/>
        </div>
    )
}

export default App