import '../css/AddToFavorites.css';
import useAuth from '../hooks/useAuth';
import { msg_to_auth, SESSION_ID_KEY } from '../utils/constants';
import { UpdateWatchLaterCall } from '../utils/network';

function AddToWatchList({movie}) {

  const {sessionId,accountId,dispatchWatchLaterMovies} = useAuth()

  const handleClick=async()=>{
    if(sessionId && accountId){
      const bodyobj = {
        "media_type":"movie",
        "media_id":movie.id,
        "watchlist":true
    }
      const resp = await UpdateWatchLaterCall(bodyobj,`${SESSION_ID_KEY}=${sessionId}`,accountId)
      if(resp.success){
        /* this centralized state update refreshes the watcch later list */
        dispatchWatchLaterMovies()
      }
    }else{
      alert(msg_to_auth)
    }
  }

  return (
    
      <div className="add-to-favs">
        <label className='title'>Add to Watchlist</label>
        <img src={require("../assets/images/clock.png")} className="fav-icon" alt="watchlist" 
              onClick={handleClick}/>
      </div>
   
  );
}

export default AddToWatchList;
