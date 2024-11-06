import { useState, useEffect } from 'react';

function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="p-4 bg-gray-100 rounded">
              <img src={movie.Poster} alt={movie.Title} className="w-full" />
              <h2 className="text-lg font-bold mt-2">{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
