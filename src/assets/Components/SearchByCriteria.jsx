import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchByCriteria = () => {
  const [currentPage, setCurrentPage] = useState("Search by criteria");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filters, setFilters] = useState({
    gender: "",
    income: "",
    religion: "",
    category: "",
    course: [],
    instituteState: "",
    aplBpl: "",
  });
  const incomeOptions = [
    "0-1 lakh",
    "1 lakh-2 lakh",
    "2 lakh-4 lakh",
    "4 lakh-8 lakh",
    "above 8 lakh",
  ];
  const courseOptions = [
    "Upto 10th",
    "+1 and +2",
    "Graduation",
    "Post Graduation",
    "Medical",
    "Engineering",
  ];
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setShowDropdown(false);

    // Check if the page is "Dashboard", then navigate to the Profile page
    if (page === "Dashboard") {
      navigate("/profile"); // Replace "/profile" with the actual route for Profile
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFilterChange = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };

  const handleCheckboxChange = (filter, value) => {
    if (filters[filter].includes(value)) {
      // Remove the value if already present
      setFilters({
        ...filters,
        [filter]: filters[filter].filter((item) => item !== value),
      });
    } else {
      // Add the value if not present
      setFilters({
        ...filters,
        [filter]: [...filters[filter], value],
      });
    }
  };

  const handleSearch = () => {
    // Implement logic to search scholarships based on filters
    console.log("Filters:", filters);
    // Navigate or perform search based on filters
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
        <main className="flex-grow p-6 pl-60 pb-20 ml-20">
          {/* Content specific to SearchByCriteria */}
          <div className="mt-3">
            <h1 className="text-2xl font-semibold mb-4 ">
              Find scholarships matched to you
            </h1>
            {/* Gender filter */}
            <div className="mb-4">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </legend>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={filters.gender === "male"}
                    onChange={(e) =>
                      handleFilterChange("gender", e.target.value)
                    }
                    className="mr-2"
                  />
                  <label htmlFor="male" className="mr-4">
                    Male
                  </label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={filters.gender === "female"}
                    onChange={(e) =>
                      handleFilterChange("gender", e.target.value)
                    }
                    className="mr-2"
                  />
                  <label htmlFor="female" className="mr-4">
                    Female
                  </label>
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    checked={filters.gender === "other"}
                    onChange={(e) =>
                      handleFilterChange("gender", e.target.value)
                    }
                    className="mr-2"
                  />
                  <label htmlFor="other">Other</label>
                </div>
              </fieldset>
            </div>

            {/* Income filter */}
            <div className="mb-4">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-1">
                  Income
                </legend>
                <div className="flex flex-wrap">
                  {incomeOptions.map((incomeRange) => (
                    <div key={incomeRange} className="mr-4 mb-2">
                      <input
                        type="checkbox"
                        id={incomeRange}
                        name="income"
                        value={incomeRange}
                        checked={filters.income.includes(incomeRange)}
                        onChange={(e) =>
                          handleCheckboxChange("income", incomeRange)
                        }
                        className="mr-2"
                      />
                      <label htmlFor={incomeRange}>{incomeRange}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Religion filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Religion
              </label>
              <select
                value={filters.religion}
                onChange={(e) => handleFilterChange("religion", e.target.value)}
                className="block w-40 border border-black rounded-md shadow-md py-2 px-3 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Religion</option>
                <option value="hindu">Hindu</option>
                <option value="buddhism">Buddhism</option>
                <option value="christian">Christian</option>
                <option value="jain">Jain</option>
                <option value="parsi">Parsi</option>
                <option value="sikh">Sikh</option>
                <option value="muslim">Muslim</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Category filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="block w-40 border border-black rounded-md shadow-md py-2 px-3 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Category</option>
                <option value="general">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>

            {/* Course filter */}
            <div className="mb-4">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </legend>
                <div className="flex flex-wrap">
                  {courseOptions.map((course) => (
                    <div key={course} className="mr-4 mb-2">
                      <input
                        type="checkbox"
                        id={course}
                        name="course"
                        value={course}
                        checked={filters.course.includes(course)}
                        onChange={(e) =>
                          handleCheckboxChange("course", e.target.value)
                        }
                        className="mr-2"
                      />
                      <label htmlFor={course}>{course}</label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Institute State filter */}
            <div className="mb-4">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-1">
                  Institute State
                </legend>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="kerala"
                    name="instituteState"
                    value="kerala"
                    checked={filters.instituteState === "kerala"}
                    onChange={(e) =>
                      handleFilterChange("instituteState", e.target.value)
                    }
                    className="mr-2"
                  />
                  <label htmlFor="kerala" className="mr-4">
                    Kerala
                  </label>
                  <input
                    type="radio"
                    id="outsideKerala"
                    name="instituteState"
                    value="outside kerala"
                    checked={filters.instituteState === "outside kerala"}
                    onChange={(e) =>
                      handleFilterChange("instituteState", e.target.value)
                    }
                    className="mr-2"
                  />
                  <label htmlFor="outsideKerala">Outside Kerala</label>
                </div>
              </fieldset>
            </div>

            {/* APL/BPL filter */}
            <div className="mb-4">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-1">
                  APL/BPL
                </legend>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="apl"
                    name="aplBpl"
                    value="apl"
                    checked={filters.aplBpl === "apl"}
                    onChange={(e) =>
                      handleFilterChange("aplBpl", e.target.value)
                    }
                    className="mr-2"
                  />
                  <label htmlFor="apl" className="mr-4">
                    APL
                  </label>
                  <input
                    type="radio"
                    id="bpl"
                    name="aplBpl"
                    value="bpl"
                    checked={filters.aplBpl === "bpl"}
                    onChange={(e) =>
                      handleFilterChange("aplBpl", e.target.value)
                    }
                    className="mr-2"
                  />
                  <label htmlFor="bpl">BPL</label>
                </div>
              </fieldset>
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSearch}
            >
              Find Matched Scholarships
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchByCriteria;
