<<<<<<< HEAD
import React from "react";

const Filter = () => {
  return (
    <div className="flex justify-evenly">
      <img src="bgimage.png" alt="" className="w-[472px] object-cover rounded-[20px]" />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[44px] pt-83">
            Find scholarships
          </h1>
          <p className="pl-5 w-3/5 text-pretty">
            Get a collections of suitable scholarships from our expansive
            scholarship database.
          </p>
        </div>

        <form className="max-w-sm mx-auto mt-10">
          <div className="mb-5">
            <label
              for="class"
              className="block mb-2 text-sm font-medium text-gray-900 text-black"
            >
              Your Present Class
            </label>
            <select
              id="class"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-light gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Select your Present Class</option>
              <option value="">Upto 10th</option>
              <option value="">+1&+2</option>
              <option value="">Graduation</option>
              <option value="">Post Graduation</option>
              <option value="">ITI</option>
              <option value="">Engineering</option>
              <option value="">Medical</option>
            </select>
          </div>
          <div className="mb-5">
            <label
              for="class"
              class="block mb-2 text-sm font-medium text-gray-900 text-black"
            >
              Gender
            </label>
            <select
              id="class"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-light gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Select your Gender</option>
              <option value="">Male</option>
              <option value="">Female</option>
              <option value="">Other</option>
            </select>
          </div>
          <div className="mb-5">
          <label
              for="class"
              class="block mb-2 text-sm font-medium text-gray-900 text-black"
            >
              State of Institute
            </label>
            <select
              id="class"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-light gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>State of Institute</option>
              <option value="">Kerala</option>
              <option value="">Outside Kerala</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Find Scholarships
          </button>
        </form>
      </div>
    </div>
  );
};

=======
const Filter = () => {
  return <div>Filter</div>;
};

>>>>>>> 9089d38c6dc65bc40ed6c8cc11af87401a98b1c7
export default Filter;
