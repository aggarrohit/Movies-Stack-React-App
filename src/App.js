import './App.css';
import React,{useEffect} from 'react'
import { AuthProvider } from './hooks/useAuth';
import Home from './screens/Home';

function App() {

 

  return (
    
    /* Wrapped whole app inside AuthProvider to access centralized data in all elements */
    
    <AuthProvider>
      <Home/>
    </AuthProvider>
  );
}

export default App;
