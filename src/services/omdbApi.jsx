const API_KEY = '5b6f719e '; // Replace with your OMDB API key
const BASE_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`;

export const fetchMovies = async (query, type = '', page = 1) => {
    const response = await fetch(`${BASE_URL}&s=${query}&type=${type}&page=${page}`);
    return response.json();
  };
  
  export const fetchMovieDetails = async (id) => {
    const response = await fetch(`${BASE_URL}&i=${id}`);
    return response.json();
  };