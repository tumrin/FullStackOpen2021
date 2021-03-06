import axios from "axios";

const addContact = (contact, setError) => {
  axios
    .post("/api/persons", {
      name: contact.name,
      number: contact.number,
      id: contact.id,
    })
    .then(() => {
      setError({ success: true, operation: "adding", name: contact.name });
    })
    .catch((error) => {
      console.log(`${error} in editContact`);
      setError({ success: false, operation: "adding", name: contact.name });
    });
  setTimeout(() => {
    setError(null);
  }, 5000);
};
const deleteContact = (contact, setError) => {
  axios
    .delete(`/api/persons/${contact.id}`)
    .then(() => {
      setError({ success: true, operation: "deleting", name: contact.name });
    })
    .catch((error) => {
      console.log(`${error} in editContact`);
      setError({ success: false, operation: "deleting", name: contact.name });
    });
  setTimeout(() => {
    setError(null);
  }, 5000);
};
const getContacts = (setError) => {
  return axios
    .get("/api/persons")
    .then((response) => response.data)
    .catch((error) => console.log(`${error} in getContact`));
};
const editContact = (contact, newNumber, setError) => {
  console.log(contact.id);
  console.log(contact);
  axios
    .put(`/api/persons/${contact.id}`, {
      ...contact,
      number: newNumber,
    })
    .then(() => {
      setError({ success: true, operation: "editing", name: contact.name });
    })
    .catch((error) => {
      console.log(`${error} in editContact`);
      setError({ success: false, operation: "editing", name: contact.name });
    });
  setTimeout(() => {
    setError(null);
  }, 5000);
};

const ServerFunctions = { addContact, deleteContact, getContacts, editContact };

export default ServerFunctions;
