require("dotenv").config();
const express = require("express");
// const morgan = require("morgan");
const db = require("./db");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
// app.use(morgan("tiny"));

// Get  all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const restaurantRatingData = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id,COUNT(*),TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id ) reviews ON restaurants.id = reviews.restaurant_id "
    );

    res.status(200).json({
      status: "success",
      results: restaurantRatingData.rows.length,
      data: {
        restaurants: restaurantRatingData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await db.query(
      `SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id,COUNT(*),TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id ) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1`,
      [req.params.id]
    );

    const reviews = await db.query(
      `SELECT * FROM reviews WHERE restaurant_id = $1`,
      [req.params.id]
    );

    // const avgRating = await db.query(
    //   `SELECT TRUNC(AVG(rating)) AS avg_rating FROM reviews WHERE restaurant_id = $1`,
    //   [req.params.id]
    // );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  const { name, location, price_range } = req.body;
  try {
    const results = await db.query(
      `INSERT INTO restaurants(name,location,price_range) VALUES ($1,$2,$3) RETURNING *`,
      [name, location, price_range]
    );

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  const { name, location, price_range } = req.body;
  try {
    const results = await db.query(
      `UPDATE restaurants SET name=$1,location=$2,price_range=$3 WHERE id=$4 RETURNING *`,
      [name, location, price_range, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      `DELETE FROM restaurants WHERE id = $1 RETURNING *`,
      [req.params.id]
    );

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

// Add a review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      `INSERT INTO reviews (restaurant_id,name,review,rating) VALUES ($1,$2,$3,$4) RETURNING *;`,
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    // console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
