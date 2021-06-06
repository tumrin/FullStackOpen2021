import React, { useState, useEffect } from "react";
import Message from "./Message";
import ServerFunctions from "./ServerFunctions";

const Person = ({person}) =>{
  return(
  <p style={{display:"inline-block"}}>
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
  const [error, setError] = useState(null)

  useEffect(() => {
      ServerFunctions.getContacts(setError)
      .then(contacts=> {
      setPersons(contacts)
      setShownPersons(contacts)})
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, change number?`)){
        editPerson(persons.find((person) => person.name===newName), newNumber)
      }
      return;
    }
    ServerFunctions.addContact({name:newName, number:newNumber, id:persons.length+1}, setError)
    if (newFilter === "") {

      setShownPersons(
        shownPersons.concat({ name: newName, number: newNumber, id:persons.length+1})
      );
    }
    setPersons(persons.concat({ name: newName, number: newNumber, id:persons.length+1}));
  };

  const editPerson = (contact, newNumber) => {
    setShownPersons(persons.map(person => person.name===contact.name?{...person, number:newNumber}:person))
    setPersons(persons.map(person => person.name===contact.name?{...person, number:newNumber}:person))
    ServerFunctions.editContact(contact, newNumber, setError)
  }

  const removePerson = (contact) => {
    if(window.confirm(`Delete ${contact.name}`)){
    setShownPersons(persons.filter((person)=>person.id!==contact.id))
    setPersons(persons.filter((person)=>person.id!==contact.id))
    console.log(contact.id)
    ServerFunctions.deleteContact(contact, setError)
    }
  }

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
      <Message error={error}/>
      <h2>Phonebook</h2>
      filter shown with
      <FilterForm filterHandler={filterHandler} newFilter={newFilter}/>
      <h2>Add New</h2>
      <PersonForm addPerson={addPerson} newName={newName} nameHandler={nameHandler} newNumber={newNumber} numberHandler={numberHandler}/>
      <h2>Numbers</h2>
      {shownPersons ? shownPersons.map((person) => (
        <div className="personentry" key={person.name}>
        <Person person={person}/> <button onClick={() =>removePerson(person)}>delete</button>
        </div>
      )):''}
    </div>
  );
};

export default App;
