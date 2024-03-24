import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const AdminNavbar = ({

  currentPage,
  handlePageChange,
  showDropdown,
  toggleDropdown,
}) => {
    const navigate = useNavigate();
  const confirmLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      navigate("/") // Call the logout function
    }
  };
  
  
  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full justify-between items-center bg-white shadow py-4 px-6">
        {/* Welcome Message */}
        <div className="pl-80">
          <div>Welcome Admin </div>
        </div>
        {/* Avatar and Dropdown */}
        <div className="flex items-center pl-96 ">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none mr-2"
          />
          <img
            className="w-6 h-6 mr-2"
            src="notifications navbar.png"
            alt="Notification Icon"
          />
          <div className="relative" onClick={toggleDropdown}>
            <div className="h-10 w-10 overflow-hidden rounded-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-10 w-10 p-3 text-white bg-gray-500 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            {/* Dropdown menu */}
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <ul className="py-1">
                  <li>
                    <button
                      className="text-gray-800 block px-4 py-2 text-sm capitalize w-full hover:bg-gray-300"
                      onClick={() => handlePageChange("Profile")}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-gray-800 block px-4 py-2 text-sm capitalize w-full hover:bg-gray-300"
                      onClick={() => handlePageChange("Change Password")}
                    >
                      Change Password
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-gray-800 block px-4 py-2 text-sm capitalize w-full hover:bg-gray-300"
                      onClick={confirmLogout} // Call confirmLogout function
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="flex h-screen pl-90 overflow-y-auto">
        {/* Sidebar */}
        <nav className="fixed top-0 left-0 flex flex-col items-start justify-center bg-blue-900 text-white w-75 p-4 h-full overflow-y-auto">
          {/* Sidebar Logo */}
          <img
            className="w-16 h-16 ml-20 mb-12 rounded-full overflow-hidden"
            src="gws icon p.png"
            alt="Logo"
          />
          {/* Sidebar Links */}
          <ul>
            <li className="mb-6 ml-5">
              <button
                onClick={() => handlePageChange("Dashboard")}
                className={`flex items-center text-lg font-semibold ${
                  currentPage === "Dashboard"
                    ? "text-blue-500"
                    : "text-white-500"
                }`}
              >
                <img
                  src="dashboard sidebar.png"
                  alt="Dashboard Icon"
                  className="w-8 h-8 mr-2"
                />
                Dashboard
              </button>
            </li>
            <li className="mb-6 ml-5">
              <button
                onClick={() => handlePageChange("Add Scholarship")}
                className={`flex items-center text-lg font-semibold ${
                  currentPage === "Add Scholarship"
                    ? "text-blue-500"
                    : "text-white-500"
                }`}
              >
                <img
                  src="search criteria sidebar.png"
                  alt="Search Icon"
                  className="w-8 h-8 mr-2"
                />
                Add Scholarship
              </button>
            </li>
            <li className="mb-6 ml-5">
              <button
                onClick={() => handlePageChange("Edit Scholarship")}
                className={`flex items-center text-lg font-semibold ${
                  currentPage === "Edit Scholarship"
                    ? "text-blue-500"
                    : "text-white-500"
                }`}
              >
                <img
                  src="apply scholarship sidebar.png"
                  alt="Apply Scholarship Icon"
                  className="w-8 h-8 mr-2"
                />
                Edit scholarships
              </button>
            </li>
            <li className="mb-6 ml-5">
              <button
                onClick={() => handlePageChange("Scholarship Collection")}
                className={`flex items-center text-lg font-semibold ${
                  currentPage === "Scholarship Collection"
                    ? "text-blue-500"
                    : "text-white-500"
                }`}
              >
                <img
                  src="scholarship collection sidebar logo.png"
                  alt="logo.png"
                  className="w-8 h-8 mr-2"
                />
                Scholarship collection
              </button>
            </li>
            <li className="mb-6 ml-5">
              <button
                onClick={() => handlePageChange("Profile")}
                className={`flex items-center text-lg font-semibold ${
                  currentPage === "Profile" ? "text-blue-500" : "text-white-500"
                }`}
              >
                <img
                  src="profile sidebar.png"
                  alt="Profile Icon"
                  className="w-8 h-8 mr-2"
                />
                Profile
              </button>
            </li>
            <li className="mb-6 ml-5">
              <button
                onClick={confirmLogout}
                className="flex items-center text-lg font-semibold"
                
              >
                <img
                  src="logout sidebar.png"
                  alt="Log Out Icon"
                  className="w-8 h-8 mr-2"
                />
                Log out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

AdminNavbar.propTypes = {
  currentPage: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
};

export default AdminNavbar;
