import { useState, useEffect } from 'react'
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Notification from "./components/Notification";
import personsService from "./services/persons";
import loginService from './services/login'

const App = () => {

    const [persons, setPersons] = useState([])
    const [search, setSearch] = useState(false)
    const [filteredPersons, setFilteredPersons] = useState([])
    const [notificationMessage, setNotificationMessage] = useState({message: '', type: '' })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

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

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedPersonappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            personsService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedPersonappUser', JSON.stringify(user))

            personsService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setNotificationMessage('Wrong credentials')
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

    const personForm = () => (
        <>
            <Filter persons={ persons } setFilteredPersons={ setFilteredPersons } setSearch={ setSearch }/>
            <h2>add a new</h2>
            <Form persons={ persons } setPersons={ setPersons } setNotificationMessage={ setNotificationMessage }/>
            <h2>Numbers</h2>
            <Persons contacts={ contacts } removeContact={ RemoveContact }/>
        </>
    )

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification notificationMessage={notificationMessage} />

            {user === null ?
                loginForm() :
                <div>
                    <p>{user.name} logged-in</p>
                    {personForm()}
                </div>
            }

        </div>
    )
}

export default App