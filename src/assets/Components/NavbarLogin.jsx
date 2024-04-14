import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NavbarLogin = ({
  userName,
  currentPage,
  handlePageChange,
  showDropdown,
  toggleDropdown,
  setSearchQuery,
}) => {
  const navigate = useNavigate();
  const confirmLogout = () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      navigate("/"); // Call the logout function
    }
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query in parent component
  };
  return (
    <div className="flex flex-col mt-16">
      {/* Top Navigation */}
      <header className="flex fixed top-0 w-full justify-between items-center bg-white shadow py-4 px-6">
        {/* Welcome Message */}
        <div className="pl-80">
          <div>Welcome {userName}</div>
        </div>
        {/* Avatar and Dropdown */}
        <div className="flex items-center pl-96 ">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none mr-2"
            onChange={handleSearchChange} // Call handleSearchChange when search input changes
          />
          <div className="relative " onClick={toggleDropdown}>
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
                      onClick={() => handlePageChange("Dashboard")}
                    >
                      Dashboard
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
      <div className="flex pl-90 overflow-y-auto">
        {/* Sidebar */}
        <nav className="fixed top-0 left-0 flex flex-col items-start justify-center bg-blue-900 text-white w-75 p-4 h-full overflow-y-auto">
          {/* Sidebar Logo */}
          <img
            className="w-16 h-16 ml-20 mb-12 rounded-full overflow-hidden"
            src="./gws.png"
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
                onClick={() => handlePageChange("Profile")}
                className={`flex items-center text-lg font-semibold ${
                  currentPage === "Profile" ? "text-blue-500" : "text-white-500"
                }`}
              >
                <img
                  src="dashboard sidebar.png"
                  alt="Dashboard Icon"
                  className="w-8 h-8 mr-2"
                />
                Profile
              </button>
            </li>
            <li className="mb-6 ml-5">
              <button
                onClick={() => handlePageChange("Search by criteria")}
                className={`flex items-center text-lg font-semibold ${
                  currentPage === "Search by criteria"
                    ? "text-blue-500"
                    : "text-white-500"
                }`}
              >
                <img
                  src="search criteria sidebar.png"
                  alt="Search Icon"
                  className="w-8 h-8 mr-2"
                />
                Search by criteria
              </button>
            </li>
            <li className="mb-6 ml-5">
              <button
                onClick={() => handlePageChange("Favourite Scholarship")}
                className={`flex items-center text-lg font-semibold ${
                  currentPage === "Favourite Scholarship"
                    ? "text-blue-500"
                    : "text-white-500"
                }`}
              >
                <img
                  src="apply scholarship sidebar.png"
                  alt="Apply Scholarship Icon"
                  className="w-8 h-8 mr-2"
                />
                Favourite scholarships
              </button>
            </li>
            <li className="mb-6 ml-5">
              <button
                onClick={() => handlePageChange("Scholarship collection")}
                className={`flex items-center text-lg font-semibold ${
                  currentPage === "Scholarship collection"
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

NavbarLogin.propTypes = {
  userName: PropTypes.string.isRequired,
  currentPage: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
};

export default NavbarLogin;
