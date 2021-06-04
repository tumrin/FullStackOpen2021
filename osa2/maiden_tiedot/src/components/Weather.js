import React, { useEffect, useState } from 'react'

const Weather = ({capital}) => {

    const apiKey = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState({temperature: 0, wind: 0, direction: 0, pressure: 0, humidity:0, status: 0})

    useEffect(()=>{
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(response => setWeather({temperature: response.main.temp, wind: response.wind.speed, direction: response.wind.deg, pressure:response.main.pressure, humidity:response.main.humidity, status: response.weather[0].main}))
    }, [apiKey, capital])

    return (
        <div className="weather">
            <h2>Weather in {capital}</h2>
            <p>Temperature: {weather.temperature} Celcius</p>
            <p>Status: {weather.status}</p>
            <p>Pressure: {weather.pressure}hPa</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind: {weather.wind}m/s {weather.direction}deg</p>
        </div>
    )
}

export default Weather
