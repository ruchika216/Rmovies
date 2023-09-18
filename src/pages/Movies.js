import React, { useContext } from "react";
import { MovieContext } from "../context";
import "../App.css";
import { Link } from "react-router-dom";

const Movies = () => {
  const { movies, isLoading, error, searchQuery, searchResults } =
    useContext(MovieContext);

  const noDataFound =
    !searchResults.length && (searchQuery.length ? true : !movies.length);
  const movieList = searchQuery.length ? searchResults : movies;

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (noDataFound) {
    return <div className="error">No Data Found</div>;
  }

  return (
    <div className="container">
      {movieList.map((movie) => {
        const {
          title,
          id,
          name,
          poster_path: posterPath,
          backdrop_path: backdropPath,
        } = movie;
        const movieTitle = title ?? name ?? "Unknown";
        const movieName = movieTitle.substring(0, 15);

        return (
          <Link to={`/movie/${id}`} key={id}>
            <div className="card">
              <img
                src={
                  posterPath
                    ? `https://image.tmdb.org/t/p/w200${posterPath}`
                    : backdropPath
                    ? `https://image.tmdb.org/t/p/w200${backdropPath}`
                    : "https://www.movienewz.com/img/films/poster-holder.jpg"
                }
                alt={movieTitle}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://www.movienewz.com/img/films/poster-holder.jpg";
                }}
              />
              <div className="card-title">
                {movieName.length >= 15 ? `${movieName}...` : movieName}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Movies;
