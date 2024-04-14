import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import { useLocation } from "react-router-dom";
import NavbarLogin from "./NavbarLogin";
import Scard from "./SCard";

const SearchByCriteria = () => {
  const location = useLocation();
  const { state } = location;
  const userName = state ? state.userName : "";
  const userEmail = state ? state.userEmail : "";
  const [currentPage, setCurrentPage] = useState("Search by criteria");
  const [showDropdown, setShowDropdown] = useState(false);
  const [present_class, setPresentClass] = useState("");
  const [gender, setGender] = useState("");
  const [institution, setInstitution] = useState("");
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!present_class || !gender || !institution) {
      alert("Please select all criteria.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "https://gateway.pythonanywhere.com/scholarships/filter/",
        {
          params: {
            course: present_class,
            gender: gender,
            institution: institution,
          },
        }
      );
      setLoading(false);
      setFilteredScholarships(response.data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

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
          {/* Criteria form */}
          <form className="max-w-sm mx-auto mt-10" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="className"
                className="block mb-2 text-sm font-medium text-gray-900 text-black"
              >
                Your Present Class
              </label>
              <select
                id="className"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-light gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={present_class}
                onChange={(e) => setPresentClass(e.target.value)}
              >
                <option value="">Select your Present Class</option>
                <option value="Upto 10th">Upto 10th</option>
                <option value="+1&+2">+1&+2</option>
                <option value="Graduation">Graduation</option>
                <option value="Post Graduation">Post Graduation</option>
                <option value="ITI">ITI</option>
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="class"
                className="block mb-2 text-sm font-medium text-gray-900 text-black"
              >
                Gender
              </label>
              <select
                id="class"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-light gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select your Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="class"
                className="block mb-2 text-sm font-medium text-gray-900 text-black"
              >
                State of Institute
              </label>
              <select
                id="class"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-light gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
              >
                <option value="">State of Institute</option>
                <option value="Kerala">Kerala</option>
                <option value="Outside Kerala">Outside Kerala</option>
              </select>
            </div>

            <button
              type="submit"
              className="flex items-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={loading}
            >
              {loading ? "Finding Scholarships..." : "Find Scholarships"}
            </button>
          </form>
        </div>
        {filteredScholarships.map((scholarship, index) => (
          <Scard
            key={index}
            id={scholarship.id}
            name={scholarship.name}
            lastDate={scholarship.lastDate}
            amount={scholarship.amount}
            eligibility={scholarship.eligibility}
          />
        ))}

        {/* Display loading indicator if loading */}
        {loading && <p>Loading...</p>}

        {/* Display error message if error */}
        {error && <p>Error: {error}</p>}
      </main>
    </>
  );
};

export default SearchByCriteria;
