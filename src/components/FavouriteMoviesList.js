import React,{ useEffect, useState } from 'react';
import '../css/FavouriteMoviesList.css';
import useAuth from '../hooks/useAuth';
import { FAVS_SCROLL_ID, LIST_TYPE_FAVOURITES, LIST_TYPE_FAVOURITES_HEADING, SESSION_ID_KEY } from '../utils/constants';
import { hasValue } from '../utils/funcs';
import { GetFavoritesCall } from '../utils/network';
import ListHeading from './ListHeading';
import ListOfMovies from './ListOfMovies';

function FavouriteMoviesList() {

  const {accountId,sessionId,refreshFavouriteMovies} = useAuth()

  const [favouriteMovies,setFavouriteMovies] = useState([])

  useEffect(()=>{
    if(hasValue(sessionId)){
      GetFavoriteMovies()
    }
  },[sessionId,refreshFavouriteMovies])

  const GetFavoriteMovies=()=>{
    
    GetFavoritesCall(`${SESSION_ID_KEY}=${sessionId}&sort_by=created_at.desc`,accountId)
    .then(resp=>{
      if(resp.results.length>0){
        setFavouriteMovies(resp.results)
      }else{
        setFavouriteMovies([])
      }
    })
    

  }

  return (<>
            <ListHeading title={LIST_TYPE_FAVOURITES_HEADING}/>
            <ListOfMovies id={FAVS_SCROLL_ID} listType={LIST_TYPE_FAVOURITES} movies={favouriteMovies}/>
            {!sessionId && favouriteMovies.length===0 
                            && <p className='please-login'>Please login to see favorite movies</p>}
            {sessionId && favouriteMovies.length===0 
                            && <p className='please-login'>No favorite movies..</p>}
          </>
  );
}

export default FavouriteMoviesList;
