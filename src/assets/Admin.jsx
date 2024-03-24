import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./Components/AdminNavbar";

const Admin = () => {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

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
    if (page === "Profile") {
      navigate("/#"); // Replace "/searchby" with the actual route for SearchByCriteria
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
    <AdminNavbar
      currentPage={currentPage}
      handlePageChange={handlePageChange}
      showDropdown={showDropdown}
      toggleDropdown={toggleDropdown}
    />
        {/* Main Content */}
        <main className="flex-grow p-6 ml-80">
          {/* Content based on current page */}
          {currentPage === "Dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
              {/* Dashboard Cards */}
              <div
                className="bg-white rounded-lg shadow-xl p-10 pl-10 border-2 border-gray-200 hover:shadow-2xl cursor-pointer"
                onClick={() => handlePageChange("Add Scholarship")}
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
                onClick={() => handlePageChange("Scholarship Collection")}
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
                onClick={() => handlePageChange("Edit Scholarship")}
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
    </>
  );
};

export default Admin;
