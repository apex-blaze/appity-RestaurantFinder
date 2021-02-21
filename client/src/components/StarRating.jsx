import React, { Fragment } from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= Math.floor(rating); ++i) {
    stars.push(<i class="fas fa-star"></i>);
  }
  if (rating % 10) {
    stars.push(<i class="fas fa-star-half-alt"></i>);
  }
  while (5 - stars.length) {
    stars.push(<i class="far fa-star"></i>);
  }
  return <Fragment>{stars}</Fragment>;
};

export default StarRating;
