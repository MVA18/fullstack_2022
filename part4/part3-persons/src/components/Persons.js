import Person from "./Person";

const Persons = ({contacts, removeContact}) => {
    return(<ul>
        {contacts.map(contact =>
            <Person key={contact.name} contact={contact} removeContact={removeContact}/>
        )}
    </ul>)
}

export default Persons;