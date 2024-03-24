import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import NavbarLogin from "./NavbarLogin";

const SearchByCriteria = () => {
  const location = useLocation();
  const { state } = location;
  const userName = state ? state.userName : "";
  const userEmail = state ? state.userEmail : "";
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

    if (page === "Dashboard") {
      navigate("/profile", {
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
    <>
      <NavbarLogin
        userName={userName}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
      />
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
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
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
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
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
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
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
                  onChange={(e) => handleFilterChange("aplBpl", e.target.value)}
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
                  onChange={(e) => handleFilterChange("aplBpl", e.target.value)}
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
    </>
  );
};
SearchByCriteria.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};
export default SearchByCriteria;
