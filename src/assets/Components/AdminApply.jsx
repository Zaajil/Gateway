// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { firestore } from "../../firebaseConfig";
// import NavbarLogin from "./NavbarLogin";

// const AdminApply = () => {
//   const { userEmail } = useParams();
//   const [userData, setUserData] = useState(null);
  

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userRef = await firestore
//           .collection("users")
//           .where("email", "==", userEmail)
//           .get();
//         if (!userRef.empty) {
//           // Assuming only one document will match the userEmail
//           const userData = userRef.docs[0].data();
//           setUserData(userData);
//         } else {
//           console.log("No user found with the provided email.");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [userEmail]);

//   if (!userData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>User Details</h2>
//       <p>Name: {userData.name}</p>
//       <p>Email: {userData.email}</p>
//       <p>Phone Number: {userData.phoneNumber}</p>
//       {/* Display documents here */}
//       <h3>Documents:</h3>
//       <ul>
//         {userData.documents.map((document, index) => (
//           <li key={index}>
//             <p>Name: {document.name}</p>
//             <p>Type: {document.type}</p>
//             <p>URL: {document.url}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminApply;
