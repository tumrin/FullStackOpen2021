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
            <input type="text" onChange={(event)=>setCountry(event.target.value)}/>
            {showCountry.length>10 ? <p>Too many matches</p> : showCountry.length === 1 ? <Country country={showCountry[0]}/> : showCountry.map(entry => <p>{entry.name}</p>)}
        </div>
    )
}

export default SearchBar
