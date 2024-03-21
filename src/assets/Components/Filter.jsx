import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Filter = () => {
  const [present_class, setPresentClass] = useState("");
  const [gender, setGender] = useState("");
  const [institution, setInstitution] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!present_class) {
      alert("Please select a course.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.get('http://127.0.0.1:8000/scholarships/filter/', {
        params: {
          course: present_class,
          gender: gender,
          institution: institution
        }
      });
      setLoading(false);
      navigate('/filter-scholarship', { state: { filteredScholarships: response.data } });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-evenly">
      <img
        src="bgimage.png"
        alt=""
        className="w-[472px] object-cover rounded-[20px]"
      />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[44px] pt-83">Find scholarships</h1>
          <p className="pl-5 w-3/5 text-pretty">
            Get a collection of suitable scholarships from our expansive
            scholarship database.
          </p>
        </div>

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
    </div>
  );
};

export default Filter;
