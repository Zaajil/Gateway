import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const DetailScholarship = () => {
  const [scholarship, setScholarship] = useState(null);
  const { id } = useParams();
  const handleApply = () => {
    alert("Please login to apply for the scholarship.");
  };
  useEffect(() => {
    const fetchScholarshipDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/scholarships/${id}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch scholarship details");
        }
        const data = await response.json();
        setScholarship(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchScholarshipDetails();
  }, [id]);

  if (!scholarship) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-lg mx-auto bg-gray-300 rounded-lg overflow-hidden shadow-md">
          <div className="p-6">
            <h1 className="text-3xl text-center font-semibold mb-4">
              {scholarship.name}
            </h1>
            <p className="text-gray-700 mb-4">{scholarship.about}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Eligibility:
                </p>
                <p className="text-sm text-gray-700">
                  {scholarship.eligibility}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Amount:</p>
                <p className="text-sm text-gray-700">{scholarship.amount}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Last Date:
                </p>
                <p className="text-sm text-gray-700">{scholarship.lastDate}</p>
              </div>
              {/* Add more scholarship details here */}
            </div>
            <button
              className="mt-4 bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900"
              onClick={handleApply}
            >
              Apply Scholarship
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailScholarship;
