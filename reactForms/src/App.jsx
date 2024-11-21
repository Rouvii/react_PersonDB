import "./styles/App.css";
import PersonList from "./components/PersonList";
import PersonForm from "./components/PersonForm";
import { useState, useEffect } from "react";
import { fetchData } from "./util/persistence";

const blankPerson = {
  id: "",
  age: "",
  name: "",
  email: "",
  gender: "",
};

function App() {
  const [persons, setPersons] = useState([]);
  const [personToEdit, setPersonToEdit] = useState(blankPerson);
  const APIURL = "http://localhost:3000/api";

  function editPerson(person) {
    setPersonToEdit(person);
  }

  function getPersons(callback) {
    //Fetch data
    fetchData(APIURL, callback);
  }

  function deletePersonById(personId) {
    //Fjern via API -jsonServer
    fetchData(`${APIURL}/${personId}`, () => {}, "DELETE");

    //Fjern fra person array via setPersons()
    setPersons([...persons.filter((p) => p.id != personId)]);
  }

  function mutatePerson(person) {
    if (person.id != "") {
      //put
      updatePerson(person);
    } else {
      //Post
      createPerson(person);
    }
  }

  function updatePerson(person) {
    console.log("update");
  }

  function createPerson(person) {
    console.log("create");
    fetchData(
      `${APIURL}`,
      (person) => setPersons([...persons, person]),
      "POST",
      person
    );
  }
  useEffect(() => {
    //get all persons
    getPersons((data) => setPersons(data));
  }, []);
  return (
    <>
      <h1>Person DB</h1>
      <PersonForm
        blankPerson={blankPerson}
        personToEdit={personToEdit}
        mutatePerson={mutatePerson}
      />

      <PersonList
        persons={persons}
        deletePersonById={deletePersonById}
        editPerson={editPerson}
      />
    </>
  );
}

export default App;
