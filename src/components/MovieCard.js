import '../css/MovieCard.css';
import { LIST_TYPE_FAVOURITES, LIST_TYPE_WATCHLATER, movies_image_path } from '../utils/constants';
import AddToFavorites from './AddToFavorites';
import RemoveFromFavorites from './RemoveFromFavorites';
import AddToWatchLater from './AddToWatchList';
import RemoveFromWatchList from './RemoveFromWatchList';
import { LazyLoadImage } from "react-lazy-load-image-component";
import React from 'react';

function MovieCard({movie,listType}) {
 
    return (
      <div className='movie-box' id='movie-box'>
          
          <LazyLoadImage
                  height={(window.innerHeight)*0.3} width={(window.innerHeight)*0.2}
                  src={movie.poster_path?movies_image_path+movie.poster_path:require('../assets/images/video-camera.png')} 
                  className="poster-image" alt={movie.original_title}
          />
          <label className='movie-title'>{movie.original_title}</label>  
          <div className='favourites-section'>
            {listType === LIST_TYPE_FAVOURITES ? <RemoveFromFavorites movie={movie}/> 
                                               : <AddToFavorites movie={movie}/>}     
            {listType === LIST_TYPE_WATCHLATER ? <RemoveFromWatchList movie={movie}/> 
                                               : <AddToWatchLater movie={movie}/>}
           
          </div>
      </div>
    )
       
   
  
}

export default React.memo(MovieCard);
