import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import NavbarLogin from "./NavbarLogin";
import NoticeBoard from "./NoticeBoard";

const Profile = () => {
  const location = useLocation();
  const { state } = location;
  const userName = state ? state.userName : "";
  const userEmail = state ? state.userEmail : "";
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  console.log("Username:", userName);
  console.log("Username:", userEmail);

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
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <NavbarLogin
        userName={userName}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
      />
      {/* Main Content */}
      <main className="flex-grow p-6 ml-80 mt-2">
        {/* Content based on current page */}
        {currentPage === "Dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
            {/* Dashboard Cards */}
            <div
              className="bg-white rounded-lg shadow-xl p-10 pl-10 border-2 border-gray-200 hover:shadow-2xl cursor-pointer"
              onClick={() => handlePageChange("Search by criteria")}
            >
              <h2 className="text-xl font-semibold text-center mb-6">
                Search By Criteria
              </h2>
              <div className="flex items-center justify-center mb-4">
                <img
                  className="w-12 h-12"
                  src="search scholarship main.png"
                  alt="Another Icon"
                />
              </div>
              {/* Profile content */}
            </div>
            <div
              className="bg-white rounded-lg shadow-xl p-10 border-2 border-gray-200 hover:shadow-2xl cursor-pointer"
              onClick={() => handlePageChange("Scholarship collection")}
            >
              <h2 className="text-xl font-semibold text-center mb-6">
                Scholarship Collection
              </h2>
              <div className="flex items-center justify-center mb-4">
                <img
                  className="w-12 h-12"
                  src="schoalrship list main.png"
                  alt="Scholarship Icon"
                />
              </div>
              {/* Scholarship collection content */}
            </div>
            <div
              className="bg-white rounded-lg shadow-xl p-10 border-2 border-gray-200 hover:shadow-2xl cursor-pointer"
              onClick={() => handlePageChange("Favourite Scholarship")}
            >
              <h2 className="text-xl font-semibold text-center mb-6">
                Favourite Scholarships
              </h2>
              <div className="flex items-center justify-center mb-4">
                <img
                  className="w-12 h-12"
                  src="apply scholarship main.png"
                  alt="Apply Scholarship Icon"
                />
              </div>
              {/* Favourite Scholarship content */}
            </div>
            <div
              className="bg-white rounded-lg shadow-xl p-10 border-2 border-gray-200 hover:shadow-2xl cursor-pointer"
              onClick={() => handlePageChange("Profile")}
            >
              <h2 className="text-xl font-semibold text-center mb-6">
                Profile
              </h2>
              <div className="flex items-center justify-center mb-4">
                <img
                  className="w-12 h-12"
                  src="apply scholarship main.png"
                  alt="Apply Scholarship Icon"
                />
              </div>
              {/* Favourite Scholarship content */}
            </div>
          </div>
        )}
        <NoticeBoard/>
        {/* Other pages content */}
      </main>
    </>
  );
};

Profile.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

export default Profile;
