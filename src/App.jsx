import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [char, setChar] = useState([]);
  const [film, setFilm] = useState([]);
  const [selectedChar, setSelectedChar] = useState("");
  const callApi = () => {
    axios.get(`https://swapi.dev/api/people/?search=${query}`).then((res) => {
      setChar(res.data.results);
    });
  };
  useEffect(() => {
    if (query.length > 0) callApi();
  }, [query]);
  console.log(char, "data");

  const filmsApi = (films) => {
    console.log(films, "hello");
    setSelectedChar();
    setFilm([]);
    films &&
      films.length > 0 &&
      films.map((film) => {
        axios.get(`${film}`).then((response) => {
          setFilm((store) => [...store, response.data.title]);
        });
      });
  };
  console.log(film, "film");
  return (
    <div>
      <h1>Search for star wars characters</h1>
      <input onChange={(e) => setQuery(e.target.value)} />
      <h2>{`Search Results for "${query}" `}</h2>

      {char.length > 0 && (
        <ul>
          {char.map((value, key) => (
            <li key={key}>
              {value?.name}
              <button
                onClick={() => {
                  filmsApi(value.films), setSelectedChar(value?.name);
                }}
              >
                Show films
              </button>
            </li>
          ))}
        </ul>
      )}
      <h2>{`Films of ${selectedChar}`}</h2>
      <ul>
        {film.map((value, key) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
