import { useState } from 'react';
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])

    const [search, setSearch] = useState(false)
    const [filteredPersons, setFilteredPersons] = useState([])
    const contacts = search ? filteredPersons : persons;

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