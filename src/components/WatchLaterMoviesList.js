import React,{ useEffect, useState } from 'react';
import '../css/MoviesList.css';
import useAuth from '../hooks/useAuth';
import { LIST_TYPE_WATCHLATER, LIST_TYPE_WATCHLATER_HEADING, SESSION_ID_KEY } from '../utils/constants';
import { hasValue } from '../utils/funcs';
import { GetWatchLatersCall } from '../utils/network';
import ListHeading from './ListHeading';
import MovieCard from './MovieCard';
import ScrollWrapper from './ScrollWrapper';

function WatchLaterMoviesList() {

  const {accountId,sessionId,refreshWatchLaterMoviesList} = useAuth()
  
  const [watchLaterMovies,setWatchLaterMovies] = useState([])

  useEffect(()=>{
    if(hasValue(sessionId)){
      GetWatchLaterMovies()
    }
  },[sessionId,refreshWatchLaterMoviesList])

  const GetWatchLaterMovies=async()=>{
    
    const resp = await GetWatchLatersCall(`${SESSION_ID_KEY}=${sessionId}&sort_by=created_at.desc`,accountId)
    if(resp.results.length>0){
      setWatchLaterMovies(resp.results)
    }

  }

  return (<>
            <ListHeading title={LIST_TYPE_WATCHLATER_HEADING}/>
              <ScrollWrapper listType={LIST_TYPE_WATCHLATER}>
              
                <div className="movies-list" id='watchlist-scroll'>
                  {watchLaterMovies.map((movie,index)=>{
                    return <MovieCard movie={movie} key={index} listType={LIST_TYPE_WATCHLATER}/>
                  })}
                </div>
              </ScrollWrapper>
              {!sessionId && watchLaterMovies.length===0 
                          && <p className='please-login'>Please login to see watch later movies</p>}
              
           
          </>
  );
}

export default React.memo(WatchLaterMoviesList) ;
