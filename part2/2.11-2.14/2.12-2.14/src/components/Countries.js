
const Countries = ({countries, onClick}) => {

    return(<ul>
        {countries.map(country =>
            <p key={country.name}>{country.name}
                <button onClick={() => onClick(country)} >show</button>
            </p>
            )}
    </ul>)
}

export default Countries;