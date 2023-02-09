import '../css/LoginView.css';
import React,{useState} from 'react'
import useAuth from '../hooks/useAuth';

function LoginView() {

  
  /* this component is used to validate the token generated from TMDB (themoviesdb) */

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const {CreateRequestToken} = useAuth()

  const LoginClicked=()=>{
    CreateRequestToken(username,password)
  }

  return (
    
      <div className="login-box">
        <div>
          <input  className='input-field'
                  placeholder='username' 
                  value={username} 
                  onChange={e=>setUsername(e.target.value)}/>
          <input  className='input-field'
                  placeholder='password' 
                  type={'password'}
                  value={password} 
                  onChange={e=>setPassword(e.target.value)}/>
        </div>
       <button onClick={LoginClicked} disabled={!username || !password}>Login</button> 
        
      </div>
   
  );
}

export default LoginView;
