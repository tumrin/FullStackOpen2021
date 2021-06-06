import axios from 'axios'

const addContact = (contact) => {
    axios
    .post('http://localhost:3001/persons', {name:contact.name, number:contact.number, id:contact.id})
    .catch(error=> console.log(`${error} in addContact`))
}
const deleteContact = (id) => {
    axios
    .delete(`http://localhost:3001/persons/${id}`)
    .catch(error=> console.log(`${error} in deleteContact`))
}
const getContacts = () => {
    return(
    axios.get('http://localhost:3001/persons')
    .then(response => response.data)
    .catch(error=> console.log(`${error} in getContact`))
    )
}
const editContact = (contact, newNumber) => {
    console.log(contact.id)
    console.log(contact)
    axios
    .put(`http://localhost:3001/persons/${contact.id}`, {...contact, number: newNumber})
    .catch(error=> console.log(`${error} in editContact`))
}

const ServerFunctions = {addContact, deleteContact, getContacts, editContact}

export default ServerFunctions