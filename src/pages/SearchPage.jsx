import { useState, useEffect } from 'react';
import { fetchMovies } from '../services/omdbApi';
import { Link } from 'react-router-dom';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true);
      fetchMovies(query, type, page)
        .then(data => {
          if (data.Response === 'True') {
            setMovies(data.Search);
            setError('');
          } else {
            setError(data.Error);
            setMovies([]);
          }
        })
        .catch(() => setError('Failed to fetch movies'))
        .finally(() => setLoading(false));
    }
  }, [query, type, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page on new search
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Movie Search App</h1>
      
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row justify-center gap-4 mb-4">
        <input
          type="text"
          className="border p-2 flex-grow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <select
          className="border p-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
            <div className="p-4 bg-gray-100 rounded hover:shadow-lg transition">
              <img src={movie.Poster} alt={movie.Title} className="w-full mb-2" />
              <h2 className="text-lg font-bold">{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>

      {movies.length > 0 && (
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            className={`px-4 py-2 mr-2 ${page === 1 ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded`}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
