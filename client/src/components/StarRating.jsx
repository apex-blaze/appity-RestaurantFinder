import React, { Fragment } from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  let i;
  for (i = 1; i <= Math.floor(rating); ++i) {
    stars.push(<i key={i} className="fas fa-star text-warning"></i>);
  }
  if (rating % 10) {
    stars.push(<i key={i++} className="fas fa-star-half-alt text-warning"></i>);
  }
  while (5 - stars.length) {
    stars.push(<i key={i++} className="far fa-star text-warning"></i>);
  }
  return <Fragment>{stars}</Fragment>;
};

export default StarRating;
