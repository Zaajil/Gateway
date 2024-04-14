import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseApp } from "../firebaseConfig";
import { auth, firestore } from "../firebaseConfig";
import PropTypes from "prop-types";

const Login = ({ closeModal }) => {
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const modalRef = useRef();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        console.log("User signed in with Google:", user);
        console.log("User email:", user.email);
  
        try {
          // Check if the user already exists in Firestore
          const userDoc = await getDoc(doc(firestore, "users", user.email)); // Use user's email as document ID
          let nameFromFirestore = ""; // Variable to store the name from Firestore
          let roleFromFirestore = "";
          if (userDoc.exists()) {
            // If user exists in Firestore, retrieve the name from there
            nameFromFirestore = userDoc.data().name;
            roleFromFirestore = userDoc.data().role;
          } else {
            // If user doesn't exist in Firestore, extract name from email
            nameFromFirestore = user.displayName;
  
            // Save user data to Firestore only if the user doesn't exist
            await setDoc(doc(firestore, "users", user.email), {
              name: nameFromFirestore,
              email: user.email,
            });
          }
  
          if (roleFromFirestore === "admin") {
            // Redirect to the admin dashboard if the user is an admin
            setIsAdmin(true);
            setSignInSuccess(true);
            setUserName(nameFromFirestore);
            setUserEmail(user.email);
            navigate("/admin", {state: { userName: nameFromFirestore, userEmail: user.email}});
          } else {
            // Set the username obtained from Firestore or extracted from email
            setUserName(nameFromFirestore);
            setUserEmail(user.email);
            setSignInSuccess(true);
            setTimeout(() => {
              navigate("/profile", {
                state: { userName: nameFromFirestore, userEmail: user.email },
              });
            }, 2000);
          }
        } catch (error) {
          console.error("Error handling sign-in with Google:", error);
          setErrorMessage("Failed to sign in with Google. Please try again.");
        }
      })
      .catch((error) => {
        setErrorMessage("Failed to sign in with Google. Please try again.");
        console.error("Sign-in with Google error:", error);
      });
  };
  

  const signInWithEmailPassword = async (event) => {
    event.preventDefault();
    const auth = getAuth(firebaseApp);
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
  
        try {
          // Check if the user already exists in Firestore
          const userDoc = await getDoc(doc(firestore, "users", user.email));
          let nameFromFirestore = ""; // Variable to store the name from Firestore
          let emailFromFirestore = "";
          let roleFromFirestore = "";
  
          if (userDoc.exists()) {
            // If user exists in Firestore, retrieve the data from there
            const userData = userDoc.data();
            nameFromFirestore = userData.name;
            emailFromFirestore = userData.email;
            roleFromFirestore = userData.role;
          } else {
            console.error("User data not found in Firestore.");
            // Handle the case when user data is not found
          }
  
          if (roleFromFirestore === "admin") {
            setSignInSuccess(true);
            setIsAdmin(true);
            setUserName(nameFromFirestore);
            setUserEmail(emailFromFirestore);
            // Redirect to the admin dashboard if the user is an admin
            navigate("/admin", {
              state: {
                userName: nameFromFirestore,
                userEmail: emailFromFirestore,
              },
            });
          } else {
            // Redirect to the profile page for non-admin users
            setUserName(nameFromFirestore);
            setUserEmail(emailFromFirestore);
            setSignInSuccess(true);
            setTimeout(() => {
              navigate("/profile", {
                state: {
                  userName: nameFromFirestore,
                  userEmail: emailFromFirestore,
                },
              });
            }, 2000);
          }
        } catch (error) {
          console.error("Error retrieving user data from Firestore:", error);
          // Handle the error
        }
        console.log("User signed in with email/password:", user);
      })
      .catch((error) => {
        console.error("Sign-in with email/password error:", error);
        setErrorMessage("Invalid email or password.");
      });
  };
  

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-lg p-8 max-w-md w-full"
      >
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-[#002D74] mb-6 text-center">
          Login
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        {signInSuccess && (
          <p className="text-green-500 text-center mb-4">
            Successfully logged in!
          </p>
        )}
        <form onSubmit={signInWithEmailPassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-[#002D74]">
              Email
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md px-4 py-2"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#002D74]">
              Password
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md px-4 py-2"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            className="w-full bg-[#002D74] text-white py-2 rounded-md hover:bg-[#206ab1] transition duration-300"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center">
          <hr className="w-1/4 border-gray-300" />
          <p className="mx-2 text-gray-500">OR</p>
          <hr className="w-1/4 border-gray-300" />
        </div>
        <button
          className="w-full bg-white border border-gray-300 text-[#002D74] py-2 rounded-md mt-6 hover:bg-gray-100 transition duration-300 flex items-center justify-center"
          onClick={signInWithGoogle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="25px"
            className="mr-2"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Sign in with Google
        </button>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#002D74]">
              Sign up
            </Link>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Forgot your password?{" "}
            <Link to="/signup" className="text-[#002D74]">
              <span className="text-[#002D74] cursor-pointer">Reset here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Login;
