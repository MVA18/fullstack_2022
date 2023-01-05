import {useState} from "react";
import personsService from "../services/persons";

const Form = ({persons, setPersons, setNotificationMessage}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const resetNameNumberState = () =>
    {
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => { setNewName(event.target.value) }
    const handleNumberChange = (event) => { setNewNumber(event.target.value) }

    const addContact = (event) => {
        event.preventDefault()

        const contactObject = {
            name: newName,
            number: newNumber
        }

        let updateContactID = null
        const found = persons.some(el => {
            updateContactID = el.id
            return el.name === newName
        })

        if(found){
            if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
                contactObject.id = updateContactID
                personsService.update(updateContactID, contactObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
                        setNotificationMessage({message:`Contact '${contactObject.name}' was successfully updated`, type: 'success'})
                        setTimeout(() => { setNotificationMessage({message : null, type : null}) },5000)
                        resetNameNumberState()
                    })
                    .catch(error => {
                        setNotificationMessage({message:error.response.data.error, type: 'error'})
                        setTimeout(() => { setNotificationMessage({message : null, type : null}) },5000)
                })
            }
            return;
        }

        personsService.create(contactObject).then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNotificationMessage({message:`Contact '${contactObject.name}' was successfully added`, type: 'success'})
            setTimeout(() => { setNotificationMessage({message : null, type : null}) },5000)
            resetNameNumberState()
        }).catch(error => {
                setNotificationMessage({message: error.response.data.error, type: 'error'})
                setTimeout(() => { setNotificationMessage({message : null, type : null}) },5000)
            })
    }

    return(
        <form onSubmit={addContact}>
            <div>
                name: <input onChange={handleNameChange} value={newName}/>
            </div>
            <div>
                number: <input onChange={handleNumberChange} value={newNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form;