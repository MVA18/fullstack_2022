import Weather from "./Weather";

const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages:</h2>
            <ul>
                {country.languages.map(language =>
                    <p key={language.name}>{language.name}</p>
                )}
            </ul>
            <img src={country.flags.png} alt={"flag"}/>
            <Weather capital={country.capital} />
        </div>
    )
}

export default Country;