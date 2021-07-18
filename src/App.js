import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Movie from "./components/Movie";
import Navbar from "./components/Navbar";
import "./components/Navbar.css";

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

  function Home() {
    return (
      <div className="home">
        <div className="banner">

          <form onSubmit={handleOnSubmit}>
            <input
              className="search"
              type="search"
              placeholder="search..."
              value={searchTerm}
              onChange={handleOnChange}
            />
          </form>

	    <img
            src="https://images.unsplash.com/photo-1585951237318-9ea5e175b891?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bW92aWV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
            alt="img"
          />
        </div>
        <div className="movie-container">
          {movies.length > 0 &&
            movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        </div>
      </div>
    );
  }

  function About() {
    return <h2>About</h2>;
  }

  function Movies() {
    return <h2>Movies</h2>;
  }

  function Tv() {
    return <h2>Tv</h2>;
  }

  function Kids() {
    return <h2>Kids</h2>;
  }

  return (
    <>
      <Router>
        <header>
          <div>
            <nav>
	  <div className="top-nav-container">
                  <Link className="top-nav-option" to="/">Home</Link>
                  <Link className="top-nav-option" to="/movies">Movies</Link>
                  <Link className="top-nav-option" to="/tv">Tv</Link>
                  <Link className="top-nav-option" to="/kids">Kids</Link>
	  </div>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          </div>

        </header>
        <Switch>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/tv">
            <Tv />
          </Route>
          <Route path="/kids">
            <Kids />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

