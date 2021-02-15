import axios from "axios";

export default axios.create({
  // Backend Server URL
  baseURL: "http://localhost:5000/api/v1/restaurants",
});
