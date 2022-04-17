import { useState, useEffect } from 'react'
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import axios from 'axios'

const App = () => {

    const [persons, setPersons] = useState([])
    const [search, setSearch] = useState(false)
    const [filteredPersons, setFilteredPersons] = useState([])
    const contacts = search ? filteredPersons : persons;

    const hook = () => {
        axios.get('http://localhost:3001/persons').then(response => {
                setPersons(response.data)
            })
    }
    useEffect(hook, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter persons={persons} setFilteredPersons={setFilteredPersons} setSearch={setSearch} />
            <h2>add a new</h2>
            <Form persons={persons} setPersons={setPersons}/>
            <h2>Numbers</h2>
            <Persons contacts={contacts}/>
        </div>
    )
}

export default App