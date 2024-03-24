import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LoginDetailScholarship = () => {
  const location = useLocation();
  const { state } = location;
  const userName = state ? state.userName : "";
  const userEmail = state ? state.userEmail : "";
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const { id } = useParams();
  const handleApply = () => {
    alert("Please login to apply for the scholarship.");
  };

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
      navigate("/scholarship", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    const fetchScholarshipDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/scholarships/${id}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch scholarship details");
        }
        const data = await response.json();
        setScholarship(data);
        navigate();
      } catch (error) {
        console.error(error);
      }
    };

    fetchScholarshipDetails();
  }, [id]);

  if (!scholarship) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen ">
      {/* Top Navigation */}
      <header className="flex justify-between items-center bg-white shadow py-4 px-6">
        {/* Welcome Message */}
        <div className="pl-80">
          <div>Welcome {userName}</div>
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
        <div>
          <div className="container mx-auto px-4 pt-14 ml-80 ">
            <div className="max-w-lg mx-auto bg-gray-300 rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <h1 className="text-3xl text-center font-semibold mb-4">
                  {scholarship.name}
                </h1>
                <p className="text-gray-700 mb-4">{scholarship.about}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Eligibility:
                    </p>
                    <p className="text-sm text-gray-700">
                      {scholarship.eligibility}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Amount:
                    </p>
                    <p className="text-sm text-gray-700">
                      {scholarship.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Last Date:
                    </p>
                    <p className="text-sm text-gray-700">
                      {scholarship.lastDate}
                    </p>
                  </div>
                  {/* Add more scholarship details here */}
                </div>
                <button
                  className="mt-4 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900"
                  onClick={handleApply}
                >
                  Apply Scholarship
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDetailScholarship;
