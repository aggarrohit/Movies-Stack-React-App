import '../css/AddToFavorites.css';
import useAuth from '../hooks/useAuth';
import { msg_to_auth, SESSION_ID_KEY } from '../utils/constants';
import { UpdateWatchLaterCall } from '../utils/network';

function RemoveFromWatchList({movie}) {

  const {sessionId,accountId,refreshWatchLaterMoviesList,setRefreshWatchLaterMoviesList} = useAuth()

  const handleClick=async()=>{
    if(sessionId && accountId){
      const bodyobj = {
        "media_type":"movie",
        "media_id":movie.id,
        "watchlist":false
    }
      const resp = await UpdateWatchLaterCall(bodyobj,`${SESSION_ID_KEY}=${sessionId}`,accountId)
      if(resp.success){
        /* this centralized state update refreshes the watch later list */
        setRefreshWatchLaterMoviesList(refreshWatchLaterMoviesList+1)
      }
    }else{
      alert(msg_to_auth)
    }
  }

  return (
    
      <div className="add-to-favs">
        <label className='title'>Remove from Watchlist</label>
        <img src={require("../assets/images/delete.png")} className="fav-icon" alt="delete-watchlist" 
              onClick={handleClick}/>
      </div>
   
  );
}

export default RemoveFromWatchList;
