import React, { createContext, useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;

export const MovieContext = createContext();

export const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchMovies = async (query) => {
    try {
      setIsLoading(true);
      const base_url = "https://api.themoviedb.org/3/";
      const url = query
        ? `${base_url}search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            query
          )}&page=1&include_adult=false`
        : `${base_url}movie/popular?api_key=${API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      query ? setSearchResults(data.results) : setMovies(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchQuery);
  }, [searchQuery]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        isLoading,
        error,
        searchQuery,
        setSearchQuery,
        searchResults,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
