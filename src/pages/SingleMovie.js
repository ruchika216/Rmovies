import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { MovieContext } from '../context';

function SingleMovie() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const { isLoading, error } = useContext(MovieContext);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
        );
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching the movie details', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieDetails) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div className='movieContainer'>
    <div className='moviePage'>
      <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={`${movieDetails.title} Poster`} />
      <div>
      
        <h1>{movieDetails.title}</h1>
        <p>{movieDetails.overview}</p>
        <p>Genre: {movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
        <p>Release Date: {movieDetails.release_date}</p>
        <div className="cast">
          {movieDetails.credits.cast.slice(0, 5).map((castMember) => (
            <div className="castMember" key={castMember.cast_id}>
              <img 
                src={castMember.profile_path ? `https://image.tmdb.org/t/p/w500${castMember.profile_path}` : 'path/to/your/default/image.jpg'} 
                alt={`${castMember.name}`} 
              />
              <p className='castMemberName'>{castMember.name}</p>
              
            </div>
            
          ))}
        </div>
       <button className="button">
          <NavLink to='/' style={{color:'white'}}>Back</NavLink>
          </button>
      </div>
  
    </div>
    </div>
  );
}

export default SingleMovie;
