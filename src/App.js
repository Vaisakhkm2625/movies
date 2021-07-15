import React, { useEffect, useState } from "react";
import "./App.css";
import Movie from "./components/Movie";

const RECOMENDATION_API =
  "https://api.themoviedb.org/3/discover/movie?api_key=d2738925a81a0e5491385c4c713d4d02&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=d2738925a81a0e5491385c4c713d4d02&query= ";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(async () => {
    getMovies(RECOMENDATION_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie Key={Movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
