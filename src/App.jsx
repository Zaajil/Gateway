import React from 'react'
import LandingPage from './assets/LandingPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './assets/Components/Login';

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