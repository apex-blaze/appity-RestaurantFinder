import React, { useState, createContext } from "react";

export const RestaurantContext = createContext();

export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
};
