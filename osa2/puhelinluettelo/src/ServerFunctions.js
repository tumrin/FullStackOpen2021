import axios from 'axios'

const addContact = (contact) => {
    axios
    .post('http://localhost:3001/persons', {name:contact.name, number:contact.number, id:contact.id})
    .catch(error=> console.log(`${error} in addContact`))
}
const deleteContact = (id) => {
    axios
    .delete(`http://localhost:3001/persons/${id}`)
    .then(response => console.log(response))
    .catch(error=> console.log(`${error} in deleteContact`))
}
const getContacts = () => {
    return(
    axios.get('http://localhost:3001/persons')
    .then(response => response.data)
    .catch(error=> console.log(`${error} in getContact`))
    )
}

const ServerFunctions = {addContact, deleteContact, getContacts}

export default ServerFunctions