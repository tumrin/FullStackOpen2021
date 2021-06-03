import React, { useEffect, useState } from 'react'
import Country from './Country'

const SearchBar = () => {
    const [country, setCountry] = useState("")
    const [showCountry, setShowCountry] = useState([])
    useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
        .then(response => response.json())
        .then(console.log("here"))
        .then(response => setShowCountry(response.filter(entry => entry.name.match((new RegExp(`^${country}\\w*`, "gi"))))))
    },[country])
    return (
        <div className="searchbar">
            Find countries:
            <input type="text" onChange={(event)=>setCountry(event.target.value)}/>
            {showCountry.length>10 ? <p>Too many matches</p> : showCountry.length === 1 ? <Country country={showCountry[0]}/> : showCountry.map(entry => {
            return(
            <div>
            <p style={{display:'inline'}}>{entry.name}</p>
            <button type="button" onClick={()=> setShowCountry(showCountry.filter(country => country.name===entry.name))} style={{display: 'inline'}}>show</button>
            </div>
            )
            })}
        </div>
    )
}

export default SearchBar
