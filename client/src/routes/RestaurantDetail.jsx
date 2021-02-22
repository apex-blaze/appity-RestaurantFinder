import React, { Fragment, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Appity from "../apis/Appity";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
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
        setSelectedRestaurant(response.data.data);
        // console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log(selectedRestaurant);
  return (
    <div>
      {selectedRestaurant && (
        <Fragment>
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurant.count
                ? `(${selectedRestaurant.restaurant.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </Fragment>
      )}
    </div>
  );
};

export default RestaurantDetail;
