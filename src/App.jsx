<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './assets/LandingPage';
import ScholarshipList from './assets/ScholarshipList';
import Home from './assets/Home';

=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./assets/LandingPage";
import Login from "./assets/Login";
import About from "./assets/About";
import Scholarships from "./assets/Scholarships";
import Contact from "./assets/contact";
import Signup from "./assets/Signup";
>>>>>>> f18fdc0d33f484689bda3aef4fdbcb1c25cd9948
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
<<<<<<< HEAD
        <Route path="/scholarship" element={<ScholarshipList />} />
        <Route path="/home" element={<Home />} />
=======
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />


>>>>>>> f18fdc0d33f484689bda3aef4fdbcb1c25cd9948
      </Routes>
    </BrowserRouter>
  );
};

export default App;
