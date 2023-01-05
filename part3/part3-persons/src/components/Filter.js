const Filter = ({persons, setFilteredPersons, setSearch}) => {

    const filterContacts = (event) =>
    {
        const filteredContacts = persons.filter(person => {
            return person.name.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setFilteredPersons(filteredContacts);
        setSearch(true)
    }

    return (
        <div>
            filter shown with <input onChange={filterContacts}/>
        </div>
    )
}

export default Filter