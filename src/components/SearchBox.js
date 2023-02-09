import '../css/SearchBox.css';

function SearchBox({searchText,setSearchText,ForceSearchMovies}) {


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      ForceSearchMovies()
    }
  }

  return (
    
      <div className="search-box">
        
        <input  className='search-input'
                placeholder='search movies..' 
                value={searchText} 
                onChange={e=>setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
                />
        <img  src={require("../assets/images/search.png")} 
              className="search-img" 
              alt="search" 
              onClick={ForceSearchMovies}
              />
        
      </div>
   
  );
}

export default SearchBox;
