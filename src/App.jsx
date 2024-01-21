import React from 'react'
import LandingPage from './assets/LandingPage';
import Login from './assets/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element ={<LandingPage/>}/>
      <Route path="/login" element ={<Login/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App