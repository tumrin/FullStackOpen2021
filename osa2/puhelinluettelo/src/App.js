import React, { useState, useEffect } from "react";
import axios from 'axios'

const Person = ({person}) =>{
  return(
  <p>
  {person.name} {person.number}
</p>
  )
}
const FilterForm = ({newFilter, filterHandler}) => {
  return(
  <input value={newFilter} onChange={filterHandler} />
  )
}
const PersonForm = ({addPerson, newName, nameHandler, newNumber, numberHandler}) => {
  return(
  <form onSubmit={addPerson}>
  <div>
    name: <input value={newName} onChange={nameHandler} />
  </div>
  <div>
    number: <input value={newNumber} onChange={numberHandler} />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [shownPersons, setShownPersons] = useState(persons);

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
      setShownPersons(response.data)})
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    if (newFilter === "") {
      setShownPersons(
        shownPersons.concat({ name: newName, number: newNumber })
      );
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
  };

  const filterHandler = (event) => {
    setNewFilter(event.target.value);
    setShownPersons(
      event.target.value === ""
        ? persons
        : persons.filter((person) =>
            person.name.match(new RegExp(`^${event.target.value}\\w*`, "gi"))
          )
    );
  };
  const nameHandler = (event) => {
    setNewName(event.target.value);
  };
  const numberHandler = (event) => {
    setNewNumber(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <FilterForm filterHandler={filterHandler} newFilter={newFilter}/>
      <h2>Add New</h2>
      <PersonForm addPerson={addPerson} newName={newName} nameHandler={nameHandler} newNumber={newNumber} numberHandler={numberHandler}/>
      <h2>Numbers</h2>
      {shownPersons.map((person) => (
        <Person key={person.name} person={person}/>
      ))}
    </div>
  );
};

export default App;
