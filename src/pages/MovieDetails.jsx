import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/omdbApi';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovieDetails(id)
      .then(data => {
        if (data.Response === 'True') {
          setMovie(data);
          setError('');
        } else {
          setError(data.Error);
        }
      })
      .catch(() => setError('Failed to fetch movie details'));
  }, [id]);

  // Function to add the movie to favorites
  const addToFavorites = (movie) => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = existingFavorites.some(fav => fav.imdbID === movie.imdbID);

    if (!isAlreadyFavorite) {
      localStorage.setItem('favorites', JSON.stringify([...existingFavorites, movie]));
      alert(`${movie.Title} has been added to your favorites!`);
    } else {
      alert(`${movie.Title} is already in your favorites.`);
    }
  };

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <img src={movie.Poster} alt={movie.Title} className="w-full md:w-1/2" />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>

          {/* Add to Favorites Button */}
          <button 
            onClick={() => addToFavorites(movie)}
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;






