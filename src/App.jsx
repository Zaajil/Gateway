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
import ScholarshipListLogin from "./assets/ScholarshipListLogin";
import FavouriteScholarship from "./assets/Components/FavouriteScholarship";
import DetailScholarship from "./assets/Components/DetailScholarship";
import LoginDetailScholarship from "./assets/Components/LoginDetailScholarship";
import AdminScholarshipList from "./assets/AdminScholarshipList";
import EditScholarship from "./assets/Components/EditScholarship";

const App = () => {
  return (
    <BrowserRouter>
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
        <Route path="/edit" element={<EditScholarship />} />
        <Route path="/filter-scholarship" element={<FilterScholarship />} />
        <Route path="/login-scholarship" element={<ScholarshipListLogin />} />
        <Route path="/admin-scholarship" element={<AdminScholarshipList />} />
        <Route
          path="/favourite-scholarship"
          element={<FavouriteScholarship />}
        />
        <Route path="/scholarships/:id" element={<DetailScholarship />} />
        <Route path="a/scholarships/:id" element={<LoginDetailScholarship />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
