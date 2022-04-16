import Person from "./Person";

const Persons = ({contacts}) => {

    return(<ul>
        {contacts.map(contact =>
            <Person key={contact.name} contact={contact}/>
        )}
    </ul>)
}

export default Persons;