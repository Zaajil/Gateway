import { useState, useEffect, useRef } from "react";
import { auth, firestore  } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Login from './Login';


const SignUp = ({ closeModal }) => {
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const modalRef = useRef();
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

  const signUpWithEmailPassword = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const phoneNumber = event.target.phoneNumber.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await setDoc(doc(firestore , "users", user.uid), {
        name,
        email,
        phoneNumber,
      });

      setSignUpSuccess(true); // Set signUpSuccess to true upon successful sign-up
      setErrorMessage(""); // Clear error message upon successful sign-up
    } catch (error) {
      setErrorMessage("Failed to sign up. Please try again.");
      console.error("Sign-up with email/password error:", error);
    }
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in with Google:", user);
        setTimeout(() => {
          navigate("/scholarship");
        }, 2000);
      })
      .catch((error) => {
        setErrorMessage("Failed to sign in with Google. Please try again.");
        console.error("Sign-in with Google error:", error);
      });
  };

  useEffect(() => {
    if (signUpSuccess) {
      navigate("/login");
    }
  }, [signUpSuccess, navigate]);

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
          Sign Up
        </h2>
        {/* Display success message if sign-up is successful */}
        {signUpSuccess && (
          <div className="flex items-center mb-4 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm4.707-11.293a1 1 0 10-1.414-1.414l-5 5a1 1 0 000 1.414l3.5 3.5a1 1 0 001.414 0l7-7a1 1 0 10-1.414-1.414l-6.293 6.293z"
                clipRule="evenodd"
              />
            </svg>
            Signed up successfully! Please login.
          </div>
        )}
        {/* Display error message if there is an error */}
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        <form onSubmit={signUpWithEmailPassword} className="space-y-4">
          {/* Input fields */}
          <div>
            <label htmlFor="name" className="block text-[#002D74]">
              Name
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md px-4 py-2"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
            />
          </div>
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
            <label htmlFor="phoneNumber" className="block text-[#002D74]">
              Phone Number
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md px-4 py-2"
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter your phone number"
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
          <div>
            <label htmlFor="confirmPassword" className="block text-[#002D74]">
              Confirm Password
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md px-4 py-2"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
            />
          </div>
          <button
            className="w-full bg-[#002D74] text-white py-2 rounded-md hover:bg-[#206ab1] transition duration-300"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        {/* "Sign in with Google" option */}
        <div className="mt-4 flex items-center justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default SignUp;
