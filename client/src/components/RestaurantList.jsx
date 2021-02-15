import React, { useEffect } from "react";
import Appity from "../apis/Appity";

const RestaurantList = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Appity.get("/");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>McDee</td>
            <td>H.P</td>
            <td>$$</td>
            <td>4</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
