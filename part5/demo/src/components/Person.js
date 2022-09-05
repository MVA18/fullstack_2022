const Person = ({contact, removeContact}) => {
    return (<div>{contact.name} {contact.number}<button onClick={() => removeContact(contact)}>delete</button></div>)
}

export default Person;