import { useEffect, useState } from "react";
import axios from "axios";

function Favorite() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:5000/favorites");
      setFavorites(response.data);
    } catch (error) {
      console.error("Error fetching favorite jokes", error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${id}`);
      setFavorites(favorites.filter((joke) => joke.id !== id));
    } catch (error) {
      console.error("Error removing joke from favorites", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Favorite Jokes</h1>
      <div className="list-group">
        {favorites?.length === 0 ? (
          <p className="text-center">No favorite jokes yet.</p>
        ) : (
          favorites.map((joke) => (
            <div
              key={joke.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <p className="mb-0">{joke.joke}</p>
              <button
                onClick={() => removeFavorite(joke.id)}
                className="btn btn-danger btn-sm"
              >
                ❌ Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorite;
