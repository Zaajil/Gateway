// FavouriteScholarshipContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const FavouriteScholarshipContext = createContext();

export const useFavouriteScholarships = () =>
  useContext(FavouriteScholarshipContext);

export const FavouriteScholarshipProvider = ({ children }) => {
  const [favouriteScholarships, setFavouriteScholarships] = useState([]);

  useEffect(() => {
    console.log("Favourite Scholarships updated:", favouriteScholarships);
  }, [favouriteScholarships]);

  const toggleFavorite = (scholarship) => {
    const index = favouriteScholarships.findIndex(
      (s) => s.name === scholarship.name
    );

    if (index === -1) {
      // If not present, add it to favorites
      setFavouriteScholarships([...favouriteScholarships, scholarship]);
    } else {
      // If present, remove it from favorites
      const updatedScholarships = favouriteScholarships.filter(
        (s) => s.name !== scholarship.name
      );
      setFavouriteScholarships(updatedScholarships);
    }
  };

  return (
    <FavouriteScholarshipContext.Provider
      value={{ favouriteScholarships, toggleFavorite }}
    >
      {children}
    </FavouriteScholarshipContext.Provider>
  );
};
