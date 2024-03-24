import { useState, useEffect } from "react";
import axios from "axios";
import SCard from "./Components/SCard";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavbarLogin from "./Components/NavbarLogin";

const ScholarshipListLogin = () => {
  const location = useLocation();
  const { state } = location;
  const userName = state ? state.userName : "";
  const userEmail = state ? state.userEmail : "";
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [showDropdown, setShowDropdown] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setShowDropdown(false);

    // Check if the page is "Search by criteria", then navigate to the SearchByCriteria page
    if (page === "Search by criteria") {
      navigate("/searchby", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Dashboard") {
      navigate("/profile", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Favourite Scholarship") {
      navigate("/favourite-scholarship", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Profile") {
      navigate("/scholarship", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/scholarships/"); // Assuming this is your API endpoint
        setScholarships(response.data.scholarships); // Update to access scholarships array from the response data
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <>
      <NavbarLogin
        userName={userName}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
      />
      <div className="ml-80 mt-8 flex-grow overflow-y-auto">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          scholarships.map((scholarship, index) => (
            <SCard
              userName={userName}
              userEmail={userEmail}
              key={index}
              id={scholarship.id}
              name={scholarship.name}
              lastDate={scholarship.lastDate}
              amount={scholarship.amount}
              eligibility={scholarship.eligibility}
            />
          ))
        )}
      </div>
    </>
  );
};
ScholarshipListLogin.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};
export default ScholarshipListLogin;
