import React,{ useEffect, useState } from 'react';
import '../css/FavouriteMoviesList.css';
import useAuth from '../hooks/useAuth';
import { LIST_TYPE_FAVOURITES, LIST_TYPE_FAVOURITES_HEADING, SESSION_ID_KEY } from '../utils/constants';
import { hasValue } from '../utils/funcs';
import { GetFavoritesCall } from '../utils/network';
import ListHeading from './ListHeading';
import MovieCard from './MovieCard';
import ScrollWrapper from './ScrollWrapper';

function FavouriteMoviesList() {

  const {accountId,sessionId,refreshFavouriteMoviesList} = useAuth()

  const [favouriteMovies,setFavouriteMovies] = useState([])
  

  useEffect(()=>{
    if(hasValue(sessionId)){
      GetFavoriteMovies()
    }
  },[sessionId,refreshFavouriteMoviesList])

  const GetFavoriteMovies=()=>{
    

    GetFavoritesCall(`${SESSION_ID_KEY}=${sessionId}&sort_by=created_at.desc`,accountId)
    .then(resp=>{
      if(resp.results.length>0){
        setFavouriteMovies(resp.results)
      }
    })
    

  }

  return (<>
            <ListHeading title={LIST_TYPE_FAVOURITES_HEADING}/>
            <ScrollWrapper listType={LIST_TYPE_FAVOURITES}>
              
              <div className="movies-list" id='fav-scroll'>
                {favouriteMovies.map((movie,index)=>{
                  return <MovieCard movie={movie} key={index} listType={LIST_TYPE_FAVOURITES}/>
                })}
                
                
              </div>
            </ScrollWrapper>
            {!sessionId && favouriteMovies.length==0 
                            && <p className='please-login'>Please login to see favorite movies</p>}
          </>
  );
}

export default React.memo(FavouriteMoviesList);
