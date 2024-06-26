import { useState, useEffect } from "react";
import axios from "axios";
import SCard from "./Components/SCard";
import Navbar from "./Components/Navbar";

const ScholarshipList = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get("https://gateway.pythonanywhere.com/scholarships/"); // Assuming this is your API endpoint
        setScholarships(response.data.scholarships); // Update to access scholarships array from the response data
      } catch (error) {
        console.error("Error fetching scholarships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mt-20 ml-24 grid grid-cols-3 gap-8">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <ul>
            {scholarships.map((scholarship, index) => (
              <SCard
                key={index}
                id={scholarship.id}
                name={scholarship.name}
                lastDate={scholarship.lastDate}
                amount={scholarship.amount}
                eligibility={scholarship.eligibility}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ScholarshipList;
