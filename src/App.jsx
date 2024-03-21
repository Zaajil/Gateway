import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./assets/LandingPage";
import ScholarshipList from "./assets/ScholarshipList";
import Home from "./assets/Home";
import Login from "./assets/Login";
import Signup from "./assets/Signup";
import Profile from "./assets/Components/Profile";
import SearchByCriteria from "./assets/Components/SearchByCriteria";
import Admin from "./assets/Admin";
import AddScholarship from "./assets/Components/AddScholarship";
import FilterScholarship from "./assets/FilterScholarship";
import FavouriteScholarship from "./assets/Components/FavouriteScholarship";
import { FavouriteScholarshipProvider } from './assets/Components/FavouriteScholarshipContext'; 

const App = () => {
  return (
    <BrowserRouter>
      <FavouriteScholarshipProvider> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/scholarship" element={<ScholarshipList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/profile" element={<Profile />} />
          <Route path="/searchby" element={<SearchByCriteria />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add" element={<AddScholarship />} />
          <Route path="/filter-scholarship" element={<FilterScholarship />} />
          <Route path="/favourite" element={<FavouriteScholarship />} />
        </Routes>
      </FavouriteScholarshipProvider>
    </BrowserRouter>
  );
};

export default App;
