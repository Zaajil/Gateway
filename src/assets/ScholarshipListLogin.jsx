import { useState, useEffect } from "react";
import axios from "axios";
import SCard from "./Components/ScardLogin";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavbarLogin from "./Components/NavbarLogin";

const ScholarshipListLogin = () => {
  const location = useLocation();
  const { state } = location;
  const userName = state ? state.userName : "";
  const userEmail = state ? state.userEmail : "";
  const [currentPage, setCurrentPage] = useState("Scholarship collection");
  const [showDropdown, setShowDropdown] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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
    if (page === "Scholarship collection") {
      navigate("/login-scholarship", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Favourite Scholarship") {
      navigate("/favourite-scholarship", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Profile") {
      navigate("/userdetails", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Dashboard") {
      navigate("/profile", {
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

  const filteredScholarships = scholarships.filter((scholarship) =>
    scholarship.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavbarLogin
        userName={userName}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
        setSearchQuery={setSearchQuery}
      />
      <div
        className="ml-80 mt-4 flex-grow grid grid-cols-2 gap-4"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 80px)" }}
      >
        <h2 className="text-2xl mt-6 font-semibold ml-96 mb-4 col-span-full">
          Scholarship List
        </h2>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          filteredScholarships.map((scholarship, index) => (
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
