import React, { useEffect, useState } from 'react'

const Weather = ({capital}) => {

    const apiKey = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState([])

    useEffect(()=>{
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(response => setWeather({...response}))
    }, [apiKey, capital])

    return (
        <div className="weather">
            <h2>Weather in {capital}</h2>
            <p>Temperature: {weather.main ? weather.main.temp: '-'} Celcius</p>
            <p>Status: {weather.weather ? weather.weather[0].main:'-'}</p>
            <p>Pressure: {weather.main? weather.main.pressure:'-'}hPa</p>
            <p>Humidity: {weather.main?weather.main.humidity:'-'}%</p>
            <p>Wind: {weather.wind? `${weather.wind.speed}m/s ${weather.wind.deg}deg`: '-m/s -deg'}</p>
        </div>
    )
}

export default Weather
