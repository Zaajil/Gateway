// import React, { useState, useEffect } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { firestore } from "../../firebaseConfig";
// import AdminNavbar from "./AdminNavbar";
// import "./ApplyScard.css";
// const ApplyScard = () => {
//   const [scholarshipApplications, setScholarshipApplications] = useState([]);

//   useEffect(() => {
//     const fetchScholarshipApplications = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(firestore, "users"));
//         const scholarshipsMap = new Map();

//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           if (data.documents && data.documents.length > 0) {
//             data.documents.forEach((document) => {
//               const scholarshipName = document.scholarship;
//               const documentURL = document.url;
//               const userDetails = {
//                 userEmail: data.email,
//                 phoneNumber: data.phoneNumber,
//               };
//               if (!scholarshipsMap.has(scholarshipName)) {
//                 scholarshipsMap.set(scholarshipName, [
//                   { documentURL, userDetails },
//                 ]);
//               } else {
//                 const existingDocuments = scholarshipsMap.get(scholarshipName);
//                 existingDocuments.push({ documentURL, userDetails });
//                 scholarshipsMap.set(scholarshipName, existingDocuments);
//               }
//             });
//           }
//         });

//         const applicationsData = Array.from(
//           scholarshipsMap,
//           ([scholarshipName, documentsAndDetails]) => ({
//             scholarshipName,
//             documentsAndDetails,
//           })
//         );

//         setScholarshipApplications(applicationsData);
//       } catch (error) {
//         console.error("Error fetching scholarship applications:", error);
//       }
//     };

//     fetchScholarshipApplications();
//   }, []);

//   return (
//     <div>
//       <AdminNavbar />
//       <div className="ml-80 mt-0 mr-10 flex-grow grid grid-cols-2 gap-4">
//         <h2 className="text-2xl mt-6 font-semibold ml-96 mb-4 col-span-full">
//           Scholarship Applications
//         </h2>
//         {scholarshipApplications.map((application, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-lg shadow-xl p-10 pl-10 border-2 border-gray-200 hover:shadow-2xl cursor-pointer"
//           >
//             <h2 className="text-lg font-semibold">
//               Scholarship Name: {application.scholarshipName}
//             </h2>
//             <div>
//               <p className="text-gray-600">Documents and User Details:</p>
//               <ul>
//                 {application.documentsAndDetails.map((docAndDetail, index) => (
//                   <li key={index}>
//                     {index === 0 && (
//                       <>
//                        <p className="text-b">User Email: {docAndDetail.userDetails.userEmail}</p>
//                         <hr />
//                         <p>
//                           User Phone Number:{" "}
//                           {docAndDetail.userDetails.phoneNumber}
//                         </p>
//                         <hr />
//                       </>
//                     )}
//                     <p>
//                       Document URL:{" "}
//                       <a
//                         href={docAndDetail.documentURL}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {docAndDetail.documentURL}
//                       </a>
//                       <hr />
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ApplyScard;
