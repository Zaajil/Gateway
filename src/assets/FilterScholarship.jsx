import { useLocation } from "react-router-dom";
import SCard from "./Components/SCard";
import Navbar from "./Components/Navbar";

const FilterScholarships = () => {
  const location = useLocation();
  const { filteredScholarships } = location.state;

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Navbar />
      <h2 className="text-xl font-semibold mt-16 mb-3">
        Filtered Scholarships
      </h2>
      {filteredScholarships.map((scholarship,index) => (
        <SCard
        key={index}
        id={scholarship.id}
        name={scholarship.name}
        lastDate={scholarship.lastDate}
        amount={scholarship.amount}
        eligibility={scholarship.eligibility}
        />
      ))}
    </div>
  );
};

export default FilterScholarships;
