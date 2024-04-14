import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

const EditNotice = () => {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState({});
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("Edit Notice");
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setShowDropdown(false);

    if (page === "Dashboard") {
      navigate("/admin");
    } else if (page === "Add Scholarship") {
      navigate("/add");
    } else if (page === "Scholarship Collection") {
      navigate("/admin-scholarship");
    } else if (page === "Edit Scholarship") {
      navigate("/edit");
    } else if (page === "Profile") {
      navigate("/#");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://gateway.pythonanywhere.com/notices/notice/");
      console.log("Response data:", response.data);
      const { notices } = response.data; // Destructure the notices array from response data
      if (Array.isArray(notices)) { // Check if notices is an array
        setNotices(notices); // Set notices state with the array
      } else {
        setError("Invalid data format received");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notices:", error);
      setError("Error fetching notices");
      setLoading(false);
    }
  };
  
  

  const handleNoticeSelection = (noticeId) => {
    const selected = notices.find((notice) => notice.id === parseInt(noticeId));
    setSelectedNotice(selected);
    setFormData(selected);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/notices/notice/${selectedNotice.id}/delete/`);
        alert("Notice deleted successfully");
        setSelectedNotice({});
        setFormData({ title: "", content: "" });
      } catch (error) {
        console.error("Error deleting notice:", error);
        setError("Error deleting notice");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/notices/notice/${selectedNotice.id}/edit/`,
        formData
      );
      alert("Notice updated successfully");
    } catch (error) {
      console.error("Error updating notice:", error);
      setError("Error updating notice");
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
        {currentPage === "Edit Notice" && (
          <div className="ml-96 mb-24">
            <h1 className="text-2xl font-bold mb-4">Edit Notice</h1>
            <div className="flex relative">
              <select
                className="bg-white border border-gray-300 rounded px-4 py-2 focus:outline-none"
                onChange={(e) => handleNoticeSelection(e.target.value)}
              >
                <option value="">Select Notice</option>
                {notices.map((notice) => (
                  <option key={notice.id} value={notice.id}>
                    {notice.title}
                  </option>
                ))}
              </select>
            </div>
            {selectedNotice && (
              <form onSubmit={handleSubmit}>
                <div className="mt-10">
                  <label className="block font-semibold">Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-80"
                  />
                </div>
                <div className="mt-4">
                  <label className="block font-semibold">Content:</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-80 h-32"
                  />
                </div>
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
      </main>
    </>
  );
};

export default EditNotice;
