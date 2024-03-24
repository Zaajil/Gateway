import { useState, useEffect } from "react";
import axios from "axios";
import SCard from "./SCard";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, firestore } from "../../firebaseConfig"; // Import necessary Firebase methods
import PropTypes from "prop-types";
import NavbarLogin from "./NavbarLogin";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FavouriteScholarship = () => {
  const location = useLocation();
  const { state } = location;
  const userName = state ? state.userName : "";
  const userEmail = state ? state.userEmail : "";
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [showDropdown, setShowDropdown] = useState(false);
  const [favoriteScholarships, setFavoriteScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setShowDropdown(false);

    // Check if the page is "Search by criteria", then navigate to the SearchByCriteria page
    if (page === "Search by criteria") {
      navigate("/searchby", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Scholarship collection") {
      navigate("/login-scholarship", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Dashboard") {
      navigate("/profile", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Profile") {
      navigate("/scholarship", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const fetchFavoriteScholarships = async () => {
      try {
        if (userEmail) {
          const q = query(
            collection(firestore, "users"),
            where("email", "==", userEmail)
          );
          const querySnapshot = await getDocs(q);
          const userDoc = querySnapshot.docs[0];
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const favoriteScholarships = userData.favoriteScholarships || [];
            if (favoriteScholarships.length > 0) {
              const scholarshipIds = favoriteScholarships.map((s) => s.id);
              const scholarshipDetailsPromises = await Promise.all(
                scholarshipIds.map((id) =>
                  axios.get(`http://127.0.0.1:8000/scholarships/${id}/`)
                )
              );
              const scholarshipDetails = scholarshipDetailsPromises.map(
                (response) => response.data
              );
              setFavoriteScholarships(scholarshipDetails);
            } else {
              console.log("No favorite scholarships found for the user.");
            }
          } else {
            console.log("User document not found for the provided email.");
          }
        } else {
          console.log("No user email provided.");
        }
      } catch (error) {
        console.error("Error fetching favorite scholarships:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };
    console.log("State:", state);
    console.log("User Email:", state ? state.userEmail : "Not available");
    if (state && state.userEmail) {
      setLoading(true); // Set loading to true before fetching data
      fetchFavoriteScholarships();
    } else {
      console.log("No user email provided.");
      setLoading(false);
    }
  }, [state]);

  return (
    <>
      <NavbarLogin
        userName={userName}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
      />
      <div className="ml-80 mt-0 ">
        {loading ? (
          <h2>Loading...</h2>
        ) : favoriteScholarships.length > 0 ? (
          favoriteScholarships.map((scholarship, index) => (
            <SCard
              userName={userName}
              userEmail={userEmail}
              key={index}
              id={scholarship.id}
              name={scholarship.name}
              lastDate={scholarship.lastDate}
              amount={scholarship.amount}
              eligibility={scholarship.eligibility}
            />
          ))
        ) : (
          <p>No favorite scholarships found.</p>
        )}
      </div>
    </>
  );
};

FavouriteScholarship.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

export default FavouriteScholarship;
