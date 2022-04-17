import Country from "./Country";
import Countries from "./Countries";

const ShowCountries = ({countries, showSingleCountry, setShowSingleCountry, country, setCountry}) => {

    const viewCountry = (country) => {
        setCountry(country)
        setShowSingleCountry(true)
    }

    const Result = () => {
        if(countries.length === 1 || showSingleCountry)
        {
            return (<Country country={country ? country : countries[0]} />)
        }
        else if(countries.length < 10)
        {
            return (<Countries countries={countries} onClick={viewCountry}/>)
        }
        return (<p>Too many matches, specify another filter</p>)
    }

    return (<Result />)
}

export default ShowCountries