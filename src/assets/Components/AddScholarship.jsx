import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios library
import AdminNavbar from "./AdminNavbar";

const AddScholarship = () => {
  const [currentPage, setCurrentPage] = useState("Add Scholarship");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [scholarshipData, setScholarshipData] = useState({
    scholarship_name: "",
    about_scholarship: "",
    eligibility_scholarship: "",
    amount_scholarship: 0,
    lastdate_scholarship: "",
    gender: "",
    course: "",
    institution: "",
    required_documents:""
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setShowDropdown(false);

    if (page === "Add Scholarship") {
      navigate("/add"); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Scholarship Collection") {
      navigate("/admin-scholarship"); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Edit Scholarship") {
      navigate("/edit"); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Scholarship Application") {
      navigate("/apply-admin"); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Notice") {
      navigate("/admin-notice"); // Replace "/searchby" with the actual route for SearchByCriteria
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScholarshipData({ ...scholarshipData, [name]: value });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting scholarship data:", scholarshipData);
      // Send POST request to Django backend
      await axios.post(
        "http://127.0.0.1:8000/scholarships/add/",
        scholarshipData,{ headers: { "Content-Type": "application/json" }}
      );
      // After successful submission, navigate to another page
      navigate("/admin");
    } catch (error) {
      console.error("Error submitting scholarship:", error);
      // Handle error here, e.g., show error message to user
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
    <div className="flex flex-col h-screen ">
      {/* Main Content */}
      <main className="flex-grow p-6 pl-60 pb-20 ml-20">
        <div className="mt-3">
          <h1 className="text-2xl font-semibold mb-4 ">Add new scholarship</h1>
          <form onSubmit={handleFormSubmit} method="post" className="max-w-lg">
            <div className="mb-4">
              <label htmlFor="scholarship_name" className="block mb-1">
                Scholarship Name
              </label>
              <input
                type="text"
                id="scholarship_name"
                name="scholarship_name"
                value={scholarshipData.scholarship_name}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="about_scholarship" className="block mb-1">
                About Scholarship
              </label>
              <textarea
                id="about_scholarship"
                name="about_scholarship"
                value={scholarshipData.about_scholarship}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="eligibility_scholarship" className="block mb-1">
                Eligibility
              </label>
              <input
                type="text"
                id="eligibility_scholarship"
                name="eligibility_scholarship"
                value={scholarshipData.eligibility_scholarship}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount_scholarship" className="block mb-1">
                Amount
              </label>
              <input
                type="number"
                id="amount_scholarship"
                name="amount_scholarship"
                value={scholarshipData.amount_scholarship}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastdate_scholarship" className="block mb-1">
                Last Date
              </label>
              <input
                type="date"
                id="lastdate_scholarship"
                name="lastdate_scholarship"
                value={scholarshipData.lastdate_scholarship}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="Gender" className="block mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={scholarshipData.gender}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="course" className="block mb-1">
                Course
              </label>
              <input
                type="text"
                id="course"
                name="course"
                value={scholarshipData.course}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="Institution" className="block mb-1">
                Institution
              </label>
              <select
                id="institution"
                name="institution"
                value={scholarshipData.institution}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full"
                required
              >
                <option value="">Select Institution</option>
                <option value="Kerala">Kerala</option>
                <option value="Outside Kerala">Outside Kerala</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="required_documents" className="block mb-1">
                Required Documents
              </label>
              <input
                type="text"
                id="required_documents"
                name="required_documents"
                value={scholarshipData.required_documents}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="website" className="block mb-1">
                Website
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={scholarshipData.website}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full"
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              >
                Save Scholarship
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
    </>
  );
};

export default AddScholarship;
