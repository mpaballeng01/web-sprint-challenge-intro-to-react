import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Character from './Character'

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {
  const [people, setPeople] = useState([]);
  
  const getPlanetFromPerson = (person, planets) => {
    const planet = planets.find(planet => planet.id === person.homeworld);
  return planet.name;
  }

  const getPeople = async () => {
    const {data: peopleData} = await axios.get(urlPeople)
    const {data: planetData} = await axios.get(urlPlanets)
    const data = peopleData.map(person => {
      return {name: person.name, planet: getPlanetFromPerson(person, planetData)}
  })

  setPeople(data);
  }
  useEffect(() => {
  getPeople();
}, [])


  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */}
      {people.map(person => <Character key={person.name} name={person.name} planet={person.planet}/>)}

    </div>
  );
}

export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
