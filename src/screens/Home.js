import '../css/Home.css';
import React from 'react'
import MoviesList from '../components/MoviesList';
import FavouriteMoviesList from '../components/FavouriteMoviesList';
import WatchLaterMoviesList from '../components/WatchLaterMoviesList';
 
function Home() {

  return (
      <div className="Home">
        
        /* this element has the header and search bar also */
        <MoviesList/>
        <FavouriteMoviesList/>
        <WatchLaterMoviesList/>
        
      </div>
  );
}

export default Home;
