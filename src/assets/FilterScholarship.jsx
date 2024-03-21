import { useLocation } from 'react-router-dom';
import SCard from './Components/SCard';

const FilterScholarships = () => {
  const location = useLocation();
  const { filteredScholarships } = location.state;

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="text-xl font-semibold mb-3">Filtered Scholarships</h2>
      {filteredScholarships.map((scholarship) => (
        <SCard
          key={scholarship.id}
          name={scholarship.name}
          amount={scholarship.amount}
        />
      ))}
    </div>
  );
};

export default FilterScholarships;
