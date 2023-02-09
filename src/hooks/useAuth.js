import React, { createContext, useContext, useEffect, useState } from 'react';
import { ACCOUNT_ID_KEY, REQUEST_TOKEN_KEY, SESSION_ID_KEY } from '../utils/constants';
import { hasValue } from '../utils/funcs';
import { CreateRequestTokenCall, CreateSessionCall, GetAccountDetailsCall, ValidateTokenCall } from '../utils/network';


const AuthContext = createContext({})

/* custom hook to store the centralized states and perform authentication related functions */
export const AuthProvider=({children})=> {

const [token,setToken] = useState();
const [sessionId,setSessionId] = useState()
const [accountId,setAccountId] = useState()
const [alert,setAlert] = useState()
const [refreshFavouriteMoviesList,setRefreshFavouriteMoviesList] = useState(1)
const [refreshWatchLaterMoviesList,setRefreshWatchLaterMoviesList] = useState(1)


useEffect(()=>{
  let active = true;
  CheckSessionIdAndRequestToken(active)
  return ()=> active = false;
},[])

/* first we check if session id and/or request toekn is present */
/* if none is present then login alert is shown */
/* if request token is present -> session creation is prompted */
/* if session id is present -> account details are fetched */
const CheckSessionIdAndRequestToken=(active)=>{
  const session_id = localStorage.getItem(SESSION_ID_KEY)
  const request_token = localStorage.getItem(REQUEST_TOKEN_KEY)
 
  if(!hasValue(session_id) && !hasValue(request_token)){
    setAlert(true)
  }else 
  if(!hasValue(session_id) && hasValue(request_token)){
    CreateSession(request_token,active)
  }else
  if(hasValue(session_id)){
    GetAccountDetails(session_id,active)
  }
}

/* if request token is present but has been expired then login alert is shown */
const CreateSession=async(request_token,active)=>{
  const bodyobj = {
                      "request_token":request_token
                  }
  const resp = await CreateSessionCall(bodyobj)
  if(resp.success){
    const session_id = resp.session_id
    localStorage.removeItem(REQUEST_TOKEN_KEY)
    if(hasValue(session_id)){
      GetAccountDetails(session_id,active)
    }
  }else{
    setAlert(true)
    console.error(resp.data.err)
  }
}

/* create token request to get new token from movies database APIs */
const CreateRequestToken=async(username,password,active=true)=>{
  const resp = await CreateRequestTokenCall()
  if(resp.success){
    const request_token = resp.request_token
    
   
    AuthenticateRequestToken(username,password,request_token,active)

  }else{
    console.error(resp.data.err)
  }
}

/* authenticating new request token with username and password at TMDB server */
const AuthenticateRequestToken=async(username,password,request_token,active=true)=>{
  const bodyobj = {
                      "username":username,
                      "password":password,
                      "request_token":request_token
                  }
  const resp = await ValidateTokenCall(bodyobj)
  if(resp.success){
    
    localStorage.setItem(REQUEST_TOKEN_KEY,request_token)
    localStorage.removeItem(SESSION_ID_KEY)
    localStorage.removeItem(ACCOUNT_ID_KEY)

    CreateSession(request_token,active)

  }else{
    window.alert(resp.status_message)
    console.error(resp.data.err)
  }
}

/* if session id is present but has been expired then login alert is shown */
const GetAccountDetails=async(session_id,active)=>{
  const resp = await GetAccountDetailsCall(`session_id=${session_id}`)
  if(resp.id){
    const account_id = resp.id
    localStorage.setItem(SESSION_ID_KEY,session_id)
    localStorage.setItem(ACCOUNT_ID_KEY,account_id)
    if(active){
      setAccountId(account_id)
      setSessionId(session_id)
      setAlert(false)
    }
  }else{
    setAlert(true)
  }

}


return (<AuthContext.Provider value={{token,setToken,
                                      AuthenticateRequestToken,
                                      sessionId,accountId,
                                      alert,CreateRequestToken,
                                      refreshFavouriteMoviesList,setRefreshFavouriteMoviesList,
                                      refreshWatchLaterMoviesList,setRefreshWatchLaterMoviesList
                                    }}>
          {children}
        </AuthContext.Provider>

      )

}



export default function useAuth(){
    return useContext(AuthContext)
}

