import { useState, useEffect } from "react";

function PersonForm({ blankPerson, personToEdit, mutatePerson }) {
  const [person, setPerson] = useState({ ...personToEdit });

  useEffect(() => {
    setPerson(personToEdit);
  }, [personToEdit]);

  function handldeChange(event) {
    const value = event.target.value;
    const name = event.target.id;
    setPerson({ ...person, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log('submit', person)
    mutatePerson(person)
    //Callback function fra App.jsx, som enten indsætter en ny person (hvis ind er otm) eller opdaterer(hvis id !="") 
  }

  return (
    <div>
      <h1> Edit/add person</h1>
      {JSON.stringify(person)}
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Id</label>
        <input
          id="id"
          type="number"
          readOnly
          placeholder="id"
          value={person.id}
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="name"
          value={person.name}
          onChange={handldeChange}
        />
        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          min="1"
          max="120"
          placeholder="age"
          value={person.age}
          onChange={handldeChange}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="email"
          value={person.email}
          onChange={handldeChange}
        />
        <label htmlFor="gender">Gender</label>
        <select id="gender" value={person.gender} onChange={handldeChange}>
          <option defaultChecked>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button> Update</button>
        <button onClick={() => setPerson(blankPerson)}>Reset</button>
      </form>
    </div>
  );
}

export default PersonForm;
