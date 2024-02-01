import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./assets/LandingPage";
import Login from "./assets/Login";
import About from "./assets/About";
import Scholarships from "./assets/Scholarships";
import Contact from "./assets/contact";
import Signup from "./assets/Signup";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
