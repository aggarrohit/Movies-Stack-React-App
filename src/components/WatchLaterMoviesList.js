import React,{ useEffect, useState } from 'react';
import '../css/MoviesList.css';
import useAuth from '../hooks/useAuth';
import { LIST_TYPE_WATCHLATER, LIST_TYPE_WATCHLATER_HEADING, SESSION_ID_KEY, WATCHLIST_SCROLL_ID } from '../utils/constants';
import { hasValue } from '../utils/funcs';
import { GetWatchLatersCall } from '../utils/network';
import ListHeading from './ListHeading';
import ListOfMovies from './ListOfMovies';

function WatchLaterMoviesList() {

  const {accountId,sessionId,refreshWatchLaterMovies} = useAuth()
  
  const [watchLaterMovies,setWatchLaterMovies] = useState([])

  useEffect(()=>{
    if(hasValue(sessionId)){
      GetWatchLaterMovies()
    }
  },[sessionId,refreshWatchLaterMovies])

  const GetWatchLaterMovies=async()=>{
    
    const resp = await GetWatchLatersCall(`${SESSION_ID_KEY}=${sessionId}&sort_by=created_at.desc`,accountId)
    if(resp.results.length>0){
      setWatchLaterMovies(resp.results)
    }else{
      setWatchLaterMovies([])
    }

  }

  return (<>
            <ListHeading title={LIST_TYPE_WATCHLATER_HEADING}/>
              <ListOfMovies id={WATCHLIST_SCROLL_ID} listType={LIST_TYPE_WATCHLATER} movies={watchLaterMovies}/>
              {!sessionId && watchLaterMovies.length===0 
                          && <p className='please-login'>Please login to see watch later movies</p>}
              {sessionId && watchLaterMovies.length==0 
                              && <p className='please-login'>No watch later movies..</p>}
              
           
          </>
  );
}

export default React.memo(WatchLaterMoviesList) ;
