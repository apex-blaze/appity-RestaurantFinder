require("dotenv").config();
const express = require("express");
// const morgan = require("morgan");
const db = require("./db");

const app = express();
app.use(express.json());
// app.use(morgan("tiny"));

// Get  all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants");
    console.log(results);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurant: "Wendys",
    },
  });
});

// Create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body);
  res.status(201).json({
    status: "success",
    data: {
      restaurant: "Wendys",
    },
  });
});

// Update restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      restaurant: "Wendys",
    },
  });
});

// Delete restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
  res.status(204).json({
    status: "success",
  });
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
