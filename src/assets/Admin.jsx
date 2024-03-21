import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = ({ userName }) => {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setShowDropdown(false);

  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex flex-col h-screen ">
      {/* Top Navigation */}
      <header className="flex justify-between items-center bg-white shadow py-4 px-6">
        {/* Welcome Message */}
        <div className="pl-80">
          <div>Welcome </div>
        </div>
        {/* Search Bar, Notification Icon, Avatar */}
        <div className="flex items-center relative">
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
                      onClick={() => handlePageChange("Dashboard")}
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
                      onClick={() => handlePageChange("Log out")}
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
      <div className="flex h-screen pl-90 ">
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
                onClick={() => handlePageChange("Dashboard")}
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
                onClick={() => handlePageChange("Apply scholarship")}
                className={`flex items-center text-lg font-semibold ${
                  currentPage === "Apply scholarship"
                    ? "text-blue-500"
                    : "text-white-500"
                }`}
              >
                <img
                  src="apply scholarship sidebar.png"
                  alt="Apply Scholarship Icon"
                  className="w-8 h-8 mr-2"
                />
                Apply scholarship
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
                onClick={() => handlePageChange("Log out")}
                className={`flex items-center text-lg font-semibold ${
                  currentPage === "Log out" ? "text-blue-500" : "text-white-500"
                }`}
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
        {/* Main Content */}
        <main className="flex-grow p-6 ml-80">
          {/* Content based on current page */}
          {currentPage === "Dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
              {/* Dashboard Cards */}
              <div
                className="bg-white rounded-lg shadow-xl p-10 pl-10 border-2 border-gray-200 hover:shadow-2xl cursor-pointer"
                onClick={() => handlePageChange("Dashboard")}
              >
                <h2 className="text-xl font-semibold text-center mb-6">
                  Add New Scholarship
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
                onClick={() => handlePageChange("Apply scholarship")}
              >
                <h2 className="text-xl font-semibold text-center mb-6">
                  Edit Scholarship
                </h2>
                <div className="flex items-center justify-center mb-4">
                  <img
                    className="w-12 h-12"
                    src="apply scholarship main.png"
                    alt="Apply Scholarship Icon"
                  />
                </div>
                {/* Apply scholarship content */}
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
                    src="search scholarship main.png"
                    alt="Another Icon"
                  />
                </div>
                {/* Another card content */}
              </div>
            </div>
          )}
          {/* Other pages content */}
        </main>
      </div>
    </div>
  );
};

export default Admin;
