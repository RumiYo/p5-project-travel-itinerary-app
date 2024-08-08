import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function StarRating({ star }) {
  const stars = [];
  const fullStars = Math.floor(star); 
  const hasHalfStar = star % 1 >= 0.5; 

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} />); // Add full star
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} />); // Add half star
    } else {
      stars.push(<FaRegStar key={i} />); // Add empty star
    }
  }

  return <div>{stars}</div>;
}

export default StarRating;