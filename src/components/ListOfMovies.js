import React from 'react';
import '../css/MoviesList.css';
import MovieCard from './MovieCard';
import ScrollWrapper from './ScrollWrapper';


const ListOfMovies=({movies,listType,id})=>{
   return <ScrollWrapper listType={listType}>
            <div className="movies-list" id={id}>
                {movies.map((movie)=>{
                  return <MovieCard movie={movie} key={movie.id} listType={listType}/>
                })}
            </div>
          </ScrollWrapper>
}

export default React.memo(ListOfMovies) ;
