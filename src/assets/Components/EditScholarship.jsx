import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const EditScholarship = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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

  const fetchScholarships = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/scholarships/");
      setScholarships(response.data.scholarships);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    }
  };

  const handleScholarshipSelection = async (scholarshipId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/scholarships/${scholarshipId}/`
      );
      setSelectedScholarship(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching scholarship details:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this scholarship?")) {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/scholarships/${selectedScholarship.id}/delete`
        );
        alert("Scholarship deleted successfully");
        // Optionally, you can navigate the user to another page after deletion
        // navigate("/admin-scholarship"); 
      } catch (error) {
        console.error("Error deleting scholarship:", error);
      }
    }
};
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/scholarships/${selectedScholarship.id}/`,
        formData
      );
      alert("Scholarship details updated successfully");
    } catch (error) {
      console.error("Error updating scholarship:", error);
    }
  };

  return (
    <>
      <AdminNavbar
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
      />
      <main className="flex-grow p-6 ml-70">
        {/* Content based on current page */}
        {currentPage === "Edit Scholarship" && (
          <div className="ml-96 mb-24">
            <h1 className="text-2xl font-bold mb-4">Edit Scholarship</h1>
            <div className="flex relative">
              {/* Dropdown menu for scholarships */}
              <select
                className=" flex right-0 top-0 bottom-0 mt-4 mr-16 bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none"
                onChange={(e) => handleScholarshipSelection(e.target.value)}
              >
                <option value="">Select Scholarship</option>
                {/* Map over scholarships to generate options */}
                {scholarships.map((scholarship) => (
                  <option key={scholarship.id} value={scholarship.id}>
                    {scholarship.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Display scholarship details */}
            {selectedScholarship && (
              <form onSubmit={handleFormSubmit}>
                {/* Input fields for scholarship details */}
                <div className="mt-10">
                  <label className="block font-semibold">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-80"
                  />
                </div>
                <div className="mt-4">
                  <label className="block font-semibold">About:</label>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-80 h-32"
                  />
                </div>
                <div className="mt-4">
                  <label className="block font-semibold">Eligibility:</label>
                  <input
                    type="text"
                    name="eligibility"
                    value={formData.eligibility}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-80"
                  />
                </div>
                <div className="mt-4">
                  <label className="block font-semibold">Amount:</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-80"
                  />
                </div>
                <div className="mt-4">
                  <label className="block font-semibold">Last Date:</label>
                  <input
                    type="date"
                    name="lastDate"
                    value={formData.lastDate}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-80"
                  />
                </div>
                <div className="mt-4">
                  <label className="block font-semibold">Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-80"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block font-semibold">Course:</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-80"
                  >
                    <option value="upto 10th">upto 10th</option>
                    <option value="Graduation">Graduation</option>
                    <option value="a">Other</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block font-semibold">Institution:</label>
                  <select
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-80"
                  >
                    <option value="Kerala">Kerala</option>
                    <option value="Outside Kerala">Outside Kerala</option>
                  </select>
                </div>
                {/* Save button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
                >
                  Save
                </button>
                <button
    onClick={handleDelete}
    className="bg-red-500 text-white rounded px-4 py-2"
  >
    Delete
  </button>
              </form>
            )}
          </div>
        )}
        {/* Other pages content */}
      </main>
    </>
  );
};

export default EditScholarship;
