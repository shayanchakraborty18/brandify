import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export const StarRating = ({ rating, info, hidetext = false }) => {
  const totalStar = 5;
  const filledStars = Math.floor(rating);
  const emptyStars = totalStar - filledStars;

  return (
    <div className="flex items-center gap-1.5">
      {!hidetext && (
        <>
          <span>{rating}</span>
          <span>{info}</span>
        </>
      )}

      <div className="flex items-center gap-0.5">
        {[...Array(filledStars)].map((_, index) => (
          <FaStar
            key={index}
            size={20}
            color="#ffc107"
            className="transition duration-200"
          />
        ))}

        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar
            key={"empty-" + index}
            size={20}
            color="#ffc107"
            className="transition duration-200"
          />
        ))}
      </div>
    </div>
  );
};
