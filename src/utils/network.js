import { api_token, base_url, server_error } from "./constants";


/***********************************************    Search Movie APIs *********************************************************/
export const SearchMoviesCall=async(query)=>{
  return NetworkCallGet('search/movie?'+query)  
}


/*********************************************    Now Playing Movie APIs *******************************************************/
export const NowPlayingMoviesCall=async()=>{
  return NetworkCallGet('movie/now_playing?')
}


/*************************************************    Favourites APIs ***********************************************************/
export const GetFavoritesCall=async(query,accountid)=>{
  return NetworkCallGet(`account/${accountid}/favorite/movies?${query}`)  
}

export const UpdateFavoriteCall=async(bodyobj,query,accountid)=>{
  return NetworkCallPOST(bodyobj,`account/${accountid}/favorite?${query}`)  
}


/*************************************************    Watch Later APIs ***********************************************************/

export const GetWatchLatersCall=async(query,accountid)=>{
  return NetworkCallGet(`account/${accountid}/watchlist/movies?${query}`)  
}

export const UpdateWatchLaterCall=async(bodyobj,query,accountid)=>{
  return NetworkCallPOST(bodyobj,`account/${accountid}/watchlist?${query}`)  
}


/*******************************************   Token, Session & Account APIs *****************************************************/

export const CreateSessionCall=async(bodyobj)=>{
  return NetworkCallPOST(bodyobj,'authentication/session/new')  
}

export const CreateRequestTokenCall=async()=>{
  return NetworkCallGet('authentication/token/new')  
}

export const ValidateTokenCall=async(bodyobj)=>{
  return NetworkCallPOST(bodyobj,'authentication/token/validate_with_login')  
}

export const GetAccountDetailsCall=async(query)=>{
  return NetworkCallGet('account?'+query)  
}

/*************************************************  API Functions ***********************************************************/


const NetworkCallGet= async(urlext)=>{
 
   return fetch(base_url+urlext, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_token}`
      }
    }).then(response=>{
      if(response.status === 200 || response.status === 201) return response.json()
      else throw new Error("Invalid response")
    }).catch(error=>{
      alert(server_error)
      console.error(error)
    })

}


const NetworkCallPOST=async(bodyobj,urlext)=>{
 
    var body = JSON.stringify(bodyobj)
   return fetch(base_url+urlext, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_token}`
      },
      body: body
    }).then(response=>{
      if(response.status === 200 || response.status === 201) return response.json()
      else throw new Error("Invalid response")  
    }).catch(error=>{
      alert(server_error)
      console.error(error)
    })
   

}