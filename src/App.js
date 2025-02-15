import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./App.css";
import { fetchPets, postPet } from "./apiService/apiService";

// Configure Amplify
Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');

  useEffect(() => {
    async function loadPets() {
      const data = await fetchPets();
      if (data) setPets(data);
    }
    loadPets();
  }, []);

  async function handlePostPet() {
    const success = await postPet({ name: petName, type: petType });
    if (success) {
      setPetName('');
      setPetType('');
      const data = await fetchPets();
      if (data) setPets(data);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello {user.username}</h1>
        <button onClick={signOut}>Sign out</button>
        <div>
          <input
            type="text"
            placeholder="Pet Name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Pet Type"
            value={petType}
            onChange={(e) => setPetType(e.target.value)}
          />
          <button onClick={handlePostPet}>Send Pet Data</button>
        </div>
        <h2>Pets List:</h2>
        <ul>
          {pets.map((pet, index) => (
            <li key={index}>{pet.name} - {pet.type}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
