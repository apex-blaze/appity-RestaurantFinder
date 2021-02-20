import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Appity from "../apis/Appity";
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

  return <div>{selectedRestaurant && selectedRestaurant.name}</div>;
};

export default RestaurantDetail;
