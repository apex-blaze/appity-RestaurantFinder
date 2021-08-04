const { Pool } = require("pg");
require("dotenv").config();

const devConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
}; // you can also represent connectionString for devConfig

const proConfig = {
  connectionString: process.env.DATABASE_URL, //heroku add-on
  ssl: true,
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);
module.exports = {
  query: (text, params) => pool.query(text, params),
};
