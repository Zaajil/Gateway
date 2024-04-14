import PropTypes from "prop-types";
import { useNavigate} from "react-router-dom";

const SCard = (props) => {
  const navigate = useNavigate();

  const handleViewScholarship = () => {
      navigate(`/scholarships/${props.id}`);

  };
 
  const handleClick = async () => {
    alert("Login to add scholarships to favourites")
  };

  return (
    <div className="max-w-md bg-[#E2EBEB] shadow-lg rounded-lg overflow-hidden mb-4 relative">
      <button
        className="absolute top-2 right-2 text-red-500 transition-colors duration-300 hover:text-red-600"
        onClick={handleClick}
      >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              stroke="black"
            />
          </svg>
      </button>
      <div className="px-6 py-4">
        <div className="text-center mb-2">
          <div className="text-xl font-bold text-gray-900">{props.name}</div>
        </div>
        <p className="text-sm text-gray-600">{props.about}</p>
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-600">Last Date:</p>
            <p className="text-sm text-gray-700">{props.lastDate}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">Amount:</p>
            <p className="text-sm text-gray-700">{props.amount}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600">Eligibility:</p>
            <p className="text-sm text-gray-700">{props.eligibility}</p>
          </div>
        </div>
        <div className="mt-4 text-center">
        <button
          onClick={handleViewScholarship}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
              View Scholarship
          </button>
        </div>
      </div>
    </div>
  );
};
SCard.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired, // userName prop is required and should be a string
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  lastDate: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  eligibility: PropTypes.string.isRequired,
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};
export default SCard;
