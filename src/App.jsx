<<<<<<< HEAD
import React from 'react'
import LandingPage from './assets/LandingPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './assets/Components/Login';
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./assets/LandingPage";
import Login from "./assets/Login";
import About from "./assets/About";
>>>>>>> 9089d38c6dc65bc40ed6c8cc11af87401a98b1c7

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
