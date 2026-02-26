import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com";

export const searchMovies = async (searchTerm) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: searchTerm,
        type: "movie",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to search movies");
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: "full",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get movie details");
  }
};
