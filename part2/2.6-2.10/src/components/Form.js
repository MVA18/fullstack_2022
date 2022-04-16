import {useState} from "react";

const Form = ({persons, setPersons}) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleNameChange = (event) => { setNewName(event.target.value) }
    const handleNumberChange = (event) => { setNewNumber(event.target.value) }

    const addContact = (event) => {
        event.preventDefault()

        const contactObject = {
            name: newName,
            number: newNumber
        }

        const found = persons.some(el => el.name === newName)

        if(found){
            alert(`${newName} is already added to phonebook`)
            return;
        }

        setPersons(persons.concat(contactObject))
        setNewName('')
        setNewNumber('')
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