import '../css/Header.css';

function Header() {


  return (
    
      <header className="App-header">
        <img src={require("../assets/images/video-camera.png")} className="App-logo" alt="logo" />
        <div className='title-box'>
            <span className='title-text'>Movies Stack</span>
            <br></br>
            <span className='subtitle-text'>Search movies, add to favorites and watch later</span>       
        </div>
        
      </header>
   
  );
}

export default Header;
