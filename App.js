import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://swapi.dev/api/people/')
      .then(response => {
        setCharacters(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Star Wars Characters</h1>
        <Switch>
          <Route path="/" exact>
            <ul>
              {characters.map(character => (
                <li key={character.name}>
                  <Link to={`/character/${character.name}`}>{character.name}</Link>
                </li>
              ))}
            </ul>
          </Route>
          <Route path="/character/:name">
            <CharacterDetail characters={characters} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function CharacterDetail({ characters }) {
  const { name } = useParams();
  const character = characters.find(c => c.name === name);

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div>
      <h2>{character.name}</h2>
      <p>Height: {character.height}</p>
      <p>Mass: {character.mass}</p>
      <p>Hair Color: {character.hair_color}</p>
      <p>Skin Color: {character.skin_color}</p>
      <Link to="/">Back to list</Link>
    </div>
  );
}

export default App;
