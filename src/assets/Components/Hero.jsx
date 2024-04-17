import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const Hero = () => {
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
      navigate("/filter-scholarship", {
        state: { filteredScholarships: response.data },
      });
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 "></div>
      <div className="absolute inset-0 bg-cover bg-center opacity-20">
        <img
          src="./bg.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute ml-10 mr-10 top-28 flex flex-col justify-center z-10 text-left text-black">
        <h1 className="text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
          Gateway To Scholarships
        </h1>
        <p className="text-base md:text-xl lg:text-2xl xl:text-3xl mb-6">
          Kerala's Largest Scholarship Platform
        </p>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl mb-6">
          Find your scholarships here
        </p>
        <form
          className="max-w-sm mx-auto ml-0 mt-0 mb-14 grid xl:grid-cols-2 
          lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 gap-5"
          onSubmit={handleSubmit}
        >
          {/* Present Class */}
          <div className="mb-0">
            <label
              htmlFor="className"
              className="block mb-2 text-sm font-medium text-gray-900 text-black"
            >
              Your Present Class
            </label>
            <select
              id="className"
              className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-light gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          {/* Gender */}
          <div className="mb-0">
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
          {/* State of Institute */}
          <div className=" mb-2">
            <label
              htmlFor="institution"
              className="block mb-2 text-sm font-medium text-gray-900 text-black"
            >
              State of Institute
            </label>
            <select
              id="institution"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-light gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            >
              <option value="">State of Institute</option>
              <option value="Kerala">Kerala</option>
              <option value="Outside Kerala">Outside Kerala</option>
            </select>
          </div>
          {/* Submit Button */}
          <div className="absolute bottom-0">
            <button
              type="submit"
              className="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={loading}
            >
              {loading ? "Finding Scholarships..." : "Find Scholarships"}
            </button>
          </div>
        </form>
      </div>
      <div className="hidden md:block lg:block absolute top-24 right-48">
        <img
          src="img.png"
          alt=""
          className="w-[272px] h-[472px] object-cover mb-5"
        />
      </div>
    </div>
  );
};

export default Hero;
