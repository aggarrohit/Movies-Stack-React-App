import React,{ useEffect, useState } from 'react';
import '../css/MoviesList.css';
import useAuth from '../hooks/useAuth';
import { LIST_TYPE_MOVIES, MOVIES_SCROLL_ID } from '../utils/constants';
import { NowPlayingMoviesCall, SearchMoviesCall } from '../utils/network';
import Header from './Header';
import ListHeading from './ListHeading';
import ListOfMovies from './ListOfMovies';
import LoginView from './LoginView';
import SearchBox from './SearchBox';

function MoviesList() {

  const [searchText,setSearchText] = useState('')
  const [movies,setMovies] = useState([])
  const {alert} = useAuth()
  

  /* auto search movie if user has typed more that 2 characters */
  /* else we show 'now playing' movies */
  useEffect(()=>{
    let active = true;
    if(searchText.length>2){
      SearchMovies(active)
    }else if(movies.length===0){
      GetNowPlayingMovies(active)
    }
    return ()=> active = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchText])


  const SearchMovies=async(active)=>{
    if(searchText.length>2){
      ForceSearchMovies(active)
    }
  }

  
  /* this is used when user wants to search for the movie name which is lesser than 3 characters */
  const ForceSearchMovies=(active=true)=>{
    if(searchText.length>0){
      SearchMoviesCall(`query=${searchText}`)
      .then(resp=>{
        if(resp.results.length>0 && active){
          setMovies(resp.results)
        }
      })
      
    }else{
      window.alert("Please write something to search..")
    }
  }


  const GetNowPlayingMovies=async(active)=>{
    
      NowPlayingMoviesCall()
      .then(resp=>{
        if(resp.results.length>0 && active){
          setMovies(resp.results)
        }
      })
      
      
    
  }

  

  return (
      <>
        <div className='main-header'>
          
          <Header/>
          <SearchBox searchText={searchText} setSearchText={setSearchText} ForceSearchMovies={ForceSearchMovies}/>
          {alert && <LoginView/>}
          
        </div>

        <ListHeading title={'Movies'}/>
      
        <ListOfMovies id={MOVIES_SCROLL_ID} listType={LIST_TYPE_MOVIES} movies={movies}/>
      </>
  );
}

export default React.memo(MoviesList);
