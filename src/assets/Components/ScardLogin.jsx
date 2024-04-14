import { useState, useEffect } from "react";
import {
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  doc,
} from "firebase/firestore";

import { firestore } from "../../firebaseConfig"; // Import necessary Firebase methods
import PropTypes from "prop-types";
import { useNavigate,useLocation } from "react-router-dom";

const SCardLogin = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const location = useLocation();
  const { state } = location;
  const userName = state ? state.userName : "";
  const userEmail = state ? state.userEmail : "";
  const navigate = useNavigate();

  console.log("Username:", userName);
  console.log("UserEmail:", userEmail);


  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "users"));
        querySnapshot.forEach((userDoc) => {
          const userData = userDoc.data();
          if (userData.email === props.userEmail) {
            setIsFavorite(
              userData.favoriteScholarships.some(
                (scholarship) => scholarship.id === props.id
              )
            );
          }
        });
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };
    
    checkFavoriteStatus();
  }, [props.id, props.userEmail]);

  const handleViewScholarship = () => {
      navigate(`/${props.id}`, { state: { userName, userEmail } });
  };
 
  const handleClick = async () => {
    setIsClicked(!isClicked);

    try {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      querySnapshot.forEach(async (userDoc) => {
        const userData = userDoc.data();
        console.log(userData)
        if (userData.email === props.userEmail) {
          const userDocRef = doc(firestore, "users", userDoc.id);

          if (isFavorite) {
            await updateDoc(userDocRef, {
              favoriteScholarships: arrayRemove({
                id: props.id,
                name: props.name,
              }),
            });
            setIsFavorite(false);
            console.log("Scholarship removed from user's favorites.");
          } else {
            await updateDoc(userDocRef, {
              favoriteScholarships: arrayUnion({
                id: props.id,
                name: props.name,
              }),
            });
            setIsFavorite(true);
            console.log("Scholarship ID and name added to user's favorites.");
          }
        }
      });
    } catch (error) {
      console.error("Error updating user document:", error);
    }
  };

  return (
    <div className="max-w-md bg-[#E2EBEB] shadow-lg rounded-lg overflow-hidden mb-4 relative">
      <button
        className="absolute top-2 right-2 text-red-500 transition-colors duration-300 hover:text-red-600"
        onClick={handleClick}
      >
        {isFavorite ? (
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
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>
        ) : (
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
        )}
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
SCardLogin.propTypes = {
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
export default SCardLogin;
