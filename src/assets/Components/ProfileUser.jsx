import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import NavbarLogin from "./NavbarLogin";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const ProfileUser = () => {
  const location = useLocation();
  const { state } = location;
  const [userName, setUserName] = useState(state ? state.userName : "");
  const userEmail = state ? state.userEmail : "";
  const [currentPage, setCurrentPage] = useState("Profile");
  const [showDropdown, setShowDropdown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [course, setCourse] = useState("");
  const [gender, setGender] = useState("");
  const [caste, setCaste] = useState("");
  const [religion, setReligion] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDocRef = doc(db, "users", userEmail);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setPhoneNumber(userData.phoneNumber || "");
          setCourse(userData.course || "");
          setGender(userData.gender || "");
          setCaste(userData.caste || "");
          setReligion(userData.religion || "");
        } else {
          console.log("No user data found. Creating new profile.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [db, userEmail]);

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
    if (page === "Favourite Scholarship") {
      navigate("/favourite-scholarship", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Profile") {
      navigate("/userdetails", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
    if (page === "Dashboard") {
      navigate("/profile", {
        state: { userName: userName, userEmail: userEmail },
      }); // Replace "/searchby" with the actual route for SearchByCriteria
    }
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const userRef = doc(db, "users", userEmail);
      await setDoc(userRef, {
        email:userEmail,
        name: userName,
        phoneNumber: phoneNumber,
        course: course,
        gender: gender,
        caste: caste,
        religion: religion,
      }, { merge: true });
      setSavedSuccessfully(true);
    } catch (error) {
      console.error("Error submitting profile:", error);
    } finally {
      setSaving(false);
    }
    
  };

  return (
    <>
      <NavbarLogin
        userName={userName}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
      />
      <div className="container mx-auto px-4 pt-14 mb-10">
        <div className="max-w-lg mx-auto bg-gray-300 rounded-lg overflow-hidden shadow-md">
          <div className="p-6">
            <h1 className="text-3xl text-center font-semibold mb-4">
              Profile Details
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600 mb-2">
                  Email : {userEmail}
                </label>
                <label className="text-sm font-semibold text-gray-600 mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="p-2 border rounded mb-4"
                />
                <label className="text-sm font-semibold text-gray-600 mb-2">
                  Phone Number:
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="p-2 border rounded mb-4"
                />
                <label className="text-sm font-semibold text-gray-600 mb-2">
                  Course:
                </label>
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="p-2 border rounded mb-4"
                />
                <label className="text-sm font-semibold text-gray-600 mb-2">
                  Gender:
                </label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="p-2 border rounded mb-4"
                />
                <label className="text-sm font-semibold text-gray-600 mb-2">
                  Caste:
                </label>
                <input
                  type="text"
                  value={caste}
                  onChange={(e) => setCaste(e.target.value)}
                  className="p-2 border rounded mb-4"
                />
                <label className="text-sm font-semibold text-gray-600 mb-2">
                  Religion:
                </label>
                <input
                  type="text"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className="p-2 border rounded mb-4"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900 mt-4"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              {savedSuccessfully && (
                <p className="text-green-600 mt-2">Saved Successfully</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

ProfileUser.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

export default ProfileUser;
