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
    const results = await db.query("SELECT * FROM restaurants");

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
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const results = await db.query(`SELECT * FROM restaurants WHERE id = $1`, [
      req.params.id,
    ]);
    // console.log(results.rows[0]);
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

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req.body);
  const { name, location, price_range } = req.body;
  try {
    const results = await db.query(
      `INSERT INTO restaurants(name,location,price_range) VALUES ($1,$2,$3) RETURNING *`,
      [name, location, price_range]
    );
    console.log(results);
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
  console.log(req.params.id);
  const { name, location, price_range } = req.body;
  try {
    const results = await db.query(
      `UPDATE restaurants SET name=$1,location=$2,price_range=$3 WHERE id=$4 RETURNING *`,
      [name, location, price_range, req.params.id]
    );
    console.log(results);
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
    console.log(results);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
