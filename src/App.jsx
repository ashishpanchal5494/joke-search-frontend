import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Favorite from "./pages/Favorite"; // Import the Favorites page
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [jokes, setJokes] = useState([]);

  const searchJokes = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://icanhazdadjoke.com/search?term=${query}`,
      { headers: { Accept: "application/json" } }
    );
    setJokes(response.data.results);
  };

  const favoriteJoke = async (joke) => {
    try {
      await axios.post("http://localhost:5000/favorites", {
        id: joke.id,
        joke: joke.joke,
      });
    } catch (error) {
      console.error("Error adding joke to favorites", error);
    }
  };

  return (
    <Router>
      <div className="p-6 max-w-2xl mx-auto">
        <nav className="mb-4 d-flex justify-content-between align-items-center">
          <Link to="/" className="btn btn-outline-primary">
            Home
          </Link>
          <Link to="/favorites" className="btn btn-outline-success">
            Favorites
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 className="text-2xl font-bold mb-4 text-center">
                  Search Dad Jokes
                </h1>
                <form onSubmit={searchJokes} className="mb-4">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="form-control mb-3"
                    placeholder="Enter a search term..."
                  />
                  <button className="btn btn-primary w-100" type="submit">
                    Search
                  </button>
                </form>

                <div className="list-group">
                  {jokes.map((joke) => (
                    <div
                      key={joke.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <p className="mb-0">{joke.joke}</p>
                      <button
                        onClick={() => favoriteJoke(joke)}
                        className="btn btn-success btn-sm"
                      >
                        ❤️ Favorite
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
          <Route path="/favorites" element={<Favorite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
