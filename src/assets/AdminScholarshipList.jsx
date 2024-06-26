import { useState, useEffect } from "react";
import axios from "axios";
import SCard from "./Components/ScardLogin";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./Components/AdminNavbar";

const AdminScholarshipList = () => {
  const location = useLocation();
  const { state } = location;
  const userName = state ? state.userName : "";
  const userEmail = state ? state.userEmail : "";
  const [currentPage, setCurrentPage] = useState("Scholarship Collection");
  const [showDropdown, setShowDropdown] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setShowDropdown(false);

    if (page === "Dashboard") {
      navigate("/admin"); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Add Scholarship") {
      navigate("/add"); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Scholarship Collection") {
      navigate("/admin-scholarship"); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Edit Scholarship") {
      navigate("/edit"); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Profile") {
      navigate("/#"); // Replace "/searchby" with the actual route for SearchByCriteria
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get("https://gateway.pythonanywhere.com/scholarships/"); // Assuming this is your API endpoint
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
      <AdminNavbar
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
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
AdminScholarshipList.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};
export default AdminScholarshipList;
