import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import NavbarLogin from "./NavbarLogin";
import PropTypes from "prop-types";
import { storage } from "../../firebaseConfig"; // Import the initialized Firebase storage instance
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

const LoginDetailScholarship = () => {
  const location = useLocation();
  const { state } = location;
  const userName = state ? state.userName : "";
  const userEmail = state ? state.userEmail : "";
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [scholarship, setScholarship] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [showApplyConfirmation, setShowApplyConfirmation] = useState(false);
  const [documentsArray, setDocumentsArray] = useState([]);
  const db = getFirestore();

  const handleApply = () => {
    setShowApplyConfirmation(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      for (let index = 0; index < documentsArray.length; index++) {
        const fileInput = document.getElementById(`document-${index}`);
        const file = fileInput.files[0];
        const storageRef = ref(storage, `${id}/${file.name}`);
        const documentName = documentsArray[index];
        await uploadBytesResumable(storageRef, file);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
        console.log(
          `File ${file.name} uploaded successfully. Download URL: ${downloadURL}`
        );
        

        // Now you can save the download URL to Firestore under the respective user's document
        // Use the user's email to identify the document
        updateUserDocumentWithURL(userEmail, file.name, downloadURL,scholarship.name,documentName,scholarship.id);
      }
      alert("Documents uploaded Successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setShowDropdown(false);

    if (page === "Search by criteria") {
      navigate("/searchby", {
        state: { userName: userName, userEmail: userEmail },
      });
    }
    if (page === "Scholarship Collection") {
      navigate("/login-scholarship", {
        state: { userName: userName, userEmail: userEmail },
      });
    }
    if (page === "Favourite Scholarship") {
      navigate("/favourite-scholarship", {
        state: { userName: userName, userEmail: userEmail },
      });
    }
    if (page === "Profile") {
      navigate("/scholarship", {
        state: { userName: userName, userEmail: userEmail },
      });
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    if (scholarship && scholarship.documents) {
      const documentsArray = scholarship.documents.split(",");
      setDocumentsArray(documentsArray);
    }
  }, [scholarship]);

  const updateUserDocumentWithURL = async (userEmail, documentName,documentType,scholarshipName,scholarshipId, documentURL) => {
    try {
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      // If a user document with the provided email exists
      if (!querySnapshot.empty) {
        // Since email is unique, there should be only one document
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        const userData = userDoc.data();
        if (!userData.documents) {
          userData.documents = [];
        }
        // Push the document details to the documents array
        userData.documents.push({
          name: documentName,
          url: documentType,
          type: scholarshipId,
          scholarship: scholarshipName,
          scholarshipId :documentURL

        });

        // Update the user document with the modified documents array
        await updateDoc(doc(db, "users", userId), {
          documents: userData.documents
        });
        if (!userData.phoneNumber) {
          // If phone number doesn't exist, add it
          await updateDoc(doc(db, "users", userDoc.id), {
            phoneNumber: phoneNumber
          });
        } else {
          // If phone number exists, update it
          await updateDoc(doc(db, "users", userDoc.id), {
            phoneNumber: phoneNumber
          });
        }

        console.log("User document updated with document URL:", documentURL);
      } else {
        console.error("No user found with the provided email:", userEmail);
      }
    } catch (error) {
      console.error("Error updating user document with document URLs:", error);
    }
  };
  

  const fetchScholarshipDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/scholarships/${id}/`);
      if (!response.ok) {
        throw new Error("Failed to fetch scholarship details");
      }
      const data = await response.json();
      setScholarship(data);
      navigate(`/${id}`, { state: { userName, userEmail } });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchScholarshipDetails();
  }, [id]);

  if (!scholarship) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavbarLogin
        userName={userName}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        showDropdown={showDropdown}
        toggleDropdown={toggleDropdown}
      />
      <div className="container mx-auto px-4 pt-14">
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
            </div>
            
          </div>
        </div>
      </div>
      {showApplyConfirmation && (
        <div className="container mx-auto px-4 pt-14 mb-10">
          <div className="max-w-lg mx-auto bg-gray-300 rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <h1 className="text-3xl text-center font-semibold mb-4">
                Required Documents
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <div className="container mx-auto px-4 pt-14">
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter Phone Number"
                      className="mt-4 p-2 border rounded"
                    />
                  </div>
                  {documentsArray.map((document, index) => (
                    <div key={index}>
                      <label
                        htmlFor={`document-${index}`}
                        className="text-sm font-semibold text-gray-600"
                      >
                        {document}
                      </label>
                      <input
                        type="file"
                        id={`document-${index}`}
                        name={`document-${index}`}
                        accept=".pdf,.doc,.docx"
                        className="mt-1"
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900 mt-4"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

LoginDetailScholarship.propTypes = {
  scholarship: PropTypes.shape({
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    eligibility: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    lastDate: PropTypes.string.isRequired,
    documents: PropTypes.string.isRequired,

    // Add more prop validations for other properties if needed
  }).isRequired,
};

export default LoginDetailScholarship;
