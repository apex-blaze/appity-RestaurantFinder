import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Appity from "../apis/Appity";
import StarRating from "../components/StarRating";
import { RestaurantContext } from "../context/RestaurantContext";

const RestaurantDetail = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Appity.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  return <div>{selectedRestaurant && <StarRating rating={3.4} />}</div>;
};

export default RestaurantDetail;
