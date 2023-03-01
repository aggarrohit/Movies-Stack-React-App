import '../css/AddToFavorites.css';
import useAuth from '../hooks/useAuth';
import { msg_to_auth, SESSION_ID_KEY } from '../utils/constants';
import { UpdateFavoriteCall } from '../utils/network';

function RemoveFromFavorites({movie}) {

  const {sessionId,accountId,dispatchFavouriteMovies} = useAuth()

  const handleClick=async()=>{
    if(sessionId && accountId){
      const bodyobj = {
        "media_type":"movie",
        "media_id":movie.id,
        "favorite":false
    }
      const resp = await UpdateFavoriteCall(bodyobj,`${SESSION_ID_KEY}=${sessionId}`,accountId)
      if(resp.success){
        /* this centralized state update refreshes the favourites list */
        dispatchFavouriteMovies()
      }
    }else{
      alert(msg_to_auth)
    }
  }

  return (
    
      <div className="add-to-favs">
        <label className='title'>Remove from favorites</label>
        <img src={require("../assets/images/delete.png")} className="fav-icon" alt="delete-favorite" 
                onClick={handleClick}/>
      </div>
   
  );
}

export default RemoveFromFavorites;
