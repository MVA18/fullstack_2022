const Filter = ({countries, reset}) => {

    const filterCountries = (event) =>
    {
        const filteredCountries = countries.filter(country => {
            return country.name.toLowerCase().includes(event.target.value.toLowerCase())
        });
        reset(filteredCountries);
    }

    return (
        <div>
            filter shown with <input onChange={filterCountries}/>
        </div>
    )
}

export default Filter