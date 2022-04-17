import {useEffect, useState} from "react";
import axios from "axios";

const Weather = ({capital}) => {
    const [weather, setWeather] = useState({})
    const [showWeather, setShowWeather] = useState(false)

    const hook = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            .then(response => { setWeather(response.data); setShowWeather(true)})
    }
    useEffect(hook, [])

    if(showWeather) {
        const icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>temperature {weather.main.temp} Celcius</p>
                <img src={icon} alt="weather"/>
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
    return (<div><p>loading...</p></div>)
}

export default Weather