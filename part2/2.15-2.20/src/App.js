import { useState, useEffect } from 'react'
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification";
import personsService from "./services/persons";

const App = () => {

    const [persons, setPersons] = useState([])
    const [search, setSearch] = useState(false)
    const [filteredPersons, setFilteredPersons] = useState([])
    const [notificationMessage, setNotificationMessage] = useState({message: 'some error happened...', type: '' })

    const contacts = search ? filteredPersons : persons;

    const RemoveContact = (contact) => {
        if (window.confirm(`Delete ${contact.name} ?`)) {
            personsService.remove(contact.id)
                .then( () => {
                        setPersons(persons.filter(n => n.id !== contact.id))
                        setNotificationMessage({
                            message: `Contact '${contact.name}' was successfully removed`,
                            type: 'success'
                        })
                        setTimeout(() => {
                            setNotificationMessage({message: null, type: null})
                        }, 5000)
                    })
                .catch(error => {
                    setNotificationMessage({
                        message: `Contact '${contact.name}' was already removed from server`,
                        type: 'error'
                    })
                    setPersons(persons.filter(n => n.id !== contact.id))
                    setTimeout(() => {
                        setNotificationMessage({message: null, type: null})
                    }, 5000)
                })
        }
    }

    const hook = () => {
        personsService.getAll()
            .then(initialPersons => { setPersons(initialPersons) })
    }
    useEffect(hook, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notificationMessage={notificationMessage} />
            <Filter persons={persons} setFilteredPersons={setFilteredPersons} setSearch={setSearch} />
            <h2>add a new</h2>
            <Form persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage}/>
            <h2>Numbers</h2>
            <Persons contacts={contacts} removeContact={RemoveContact}/>
        </div>
    )
}

export default App