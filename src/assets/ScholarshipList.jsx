import { useState, useEffect } from "react";
import axios from "axios";
import SCard from "./Components/SCard";

const ScholarshipList = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/scholarships/"); // Assuming this is your API endpoint
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
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <ul>
          {scholarships.map((scholarship, index) => (
            <SCard
              key={index}
              name={scholarship.name}
              lastDate={scholarship.lastDate}
              amount={scholarship.amount}
              eligibility={scholarship.eligibility}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScholarshipList;
