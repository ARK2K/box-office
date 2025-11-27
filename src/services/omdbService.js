import axios from 'axios';

const API_KEY = import.meta.env.VITE_REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (searchTerm) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: searchTerm,
        apikey: API_KEY,
        type: 'movie'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { Response: 'False', Error: 'Failed to fetch movies' };
  }
};

export const searchActors = async (searchTerm) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: searchTerm,
        apikey: API_KEY,
        type: 'person'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching actors:', error);
    return { Response: 'False', Error: 'Failed to fetch actors' };
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        i: imdbID,
        apikey: API_KEY,
        plot: 'full'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return { Response: 'False', Error: 'Failed to fetch details' };
  }
};

export const searchAll = async (searchTerm) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: searchTerm,
        apikey: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching:', error);
    return { Response: 'False', Error: 'Failed to search' };
  }
};