require("dotenv").config();
const express = require("express");

const app = express();

// Get  all restaurants
app.get("/api/v1/restaurants", (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      restaurants: ["Pizza Hut", "KFC", "McDownalds"],
    },
  });
});

// Get a restaurant
app.get("/api/v1/restaurant/:id", (req, res) => {
  console.log(req.params);
});

// Create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body);
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
