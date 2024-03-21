import React from "react";
import { useFavouriteScholarships } from "./FavouriteScholarshipContext";
import SCard from "./SCard";

const FavoritePage = () => {
  const { favouriteScholarships } = useFavouriteScholarships();

  console.log("Favourite Scholarships length:", favouriteScholarships.length);
  console.log("Favourite Scholarships:", favouriteScholarships);

  return (
    <div>
      <h1>Favourite Scholarships</h1>
      {favouriteScholarships.length > 0 ? (
        <div className="flex flex-wrap">
          {favouriteScholarships.map((scholarship) => (
            <SCard
              key={scholarship.id} // Assuming scholarship has an id
              name={scholarship.name}
              lastDate={scholarship.lastDate}
              amount={scholarship.amount}
              eligibility={scholarship.eligibility}
            />
          ))}
        </div>
      ) : (
        <p>No favourite scholarships added yet.</p>
      )}
    </div>
  );
};

export default FavoritePage;
