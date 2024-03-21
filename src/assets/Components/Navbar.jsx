import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "../../assets/Login"; // Import the Login component
import SignUp from "../../assets/Signup"; // Import the SignUp component

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  const toggleSignUp = () => {
    setIsSignUpOpen(!isSignUpOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (isLoginOpen || isSignUpOpen) &&
        !event.target.closest(".modal-content")
      ) {
        setIsLoginOpen(false);
        setIsSignUpOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoginOpen, isSignUpOpen]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="gws icon p.png"
            className="h-8 rounded-md"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl  font-semibold whitespace-nowrap dark:text-white">
            Gateway To Scholarships
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/">
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link to="/scholarship">
                <a className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Scholarships
                </a>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact Us
                </a>
              </Link>
            </li>
            <li>
              <button
                onClick={toggleLogin}
                className="ml-3 bg-[#24306E] text-white font-bold py-2 px-4 rounded-full"
              >
                Login
              </button>
            </li>
            <li>
              <button
                onClick={toggleSignUp}
                className="ml-3 bg-white text-[#24306E] font-bold py-2 px-4 rounded-full"
              >
                Sign up
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Render Login or SignUp component as a popup modal */}
      {(isLoginOpen || isSignUpOpen) && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full modal-content relative">
            <button
              onClick={isLoginOpen ? toggleLogin : toggleSignUp}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              X
            </button>
            {isLoginOpen && <Login closeModal={toggleLogin} />}
            {isSignUpOpen && <SignUp closeModal={toggleSignUp} />}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
