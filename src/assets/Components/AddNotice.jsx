import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

const AddNotice = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState("Notice");
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
    if (page === "Notice") {
      navigate("/admin-notice"); // Replace "/searchby" with the actual route for SearchByCriteria
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/notices/notice/add/",
        {
        
          title,
          content,
        }
      );
      setMessage(response.data.message);
      setTitle("");
      setContent("");
    } catch (error) {
      setError(error.response.data.error || "An error occurred");
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
        <div className="flex flex-col h-screen">
      <main className="flex-grow p-6 pl-60 pb-20 ml-20">
        <div className="mt-3">
          <h1 className="text-2xl font-semibold mb-4">Add New Notice</h1>
          <form onSubmit={handleSubmit} className="max-w-lg">
            <div className="mb-4">
              <label htmlFor="title" className="block mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none w-full"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              >
                Save Notice
              </button>
            </div>
          </form>
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </main>
    </div>
    </>
  );
};

export default AddNotice;
