import '../css/AddToFavorites.css';
import { msg_to_auth, SESSION_ID_KEY } from '../utils/constants';
import useAuth from '../hooks/useAuth'
import { UpdateFavoriteCall } from '../utils/network';


function AddToFavorites({movie}) {

  const {sessionId,accountId,refreshFavouriteMoviesList,setRefreshFavouriteMoviesList} = useAuth()

  const handleClick=async()=>{
    if(sessionId && accountId){
      const bodyobj = {
        "media_type":"movie",
        "media_id":movie.id,
        "favorite":true
    }
      const resp = await UpdateFavoriteCall(bodyobj,`${SESSION_ID_KEY}=${sessionId}`,accountId)
      if(resp.success){
        /* this centralized state update refreshes the favourites list */
        setRefreshFavouriteMoviesList(refreshFavouriteMoviesList+1)
      }
    }else{
      alert(msg_to_auth)
    }
  }

  return (
    
      <div className="add-to-favs">
        <label className='title'>Add to favorites</label>
        <img src={require("../assets/images/favourite.png")} className="fav-icon" alt="favorite" 
            onClick={handleClick}/>
      </div>
   
  );
}

export default AddToFavorites;
