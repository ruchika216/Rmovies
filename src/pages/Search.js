import React, { useContext } from 'react';
import { MovieContext } from '../context';

const Search = () => {
  const { searchQuery, setSearchQuery } = useContext(MovieContext);

  return (
    <section className="search-section">
        <div className='app-name'>
            <h2>RMovies</h2>
        </div>
       <div className="search-form">
       <form  action="#" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search Movie"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
       </div>
        <div className="card-error"></div>
    </section>
  );
};

export default Search;

