import React from "react";
import StarIcon from "./StarIcon";


interface RatingStarsProps {
  rating?: number | null;
  maxStars?: number;
  // You can add more props if needed
}

function RatingStars({ rating }: RatingStarsProps) {
  if (rating === undefined || rating === null) {
    return (
      <div className="mb-5 mt-2.5 flex items-center">No rating available.</div>
    );
  }

  const fullStars = Math.floor(rating);
  return (
    <div className="mb-5 mt-2.5 flex items-center">
      {Array.from({ length: fullStars }, (_, index) => (
        <StarIcon key={`full-${index}`} />
      ))}
      <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default RatingStars;
