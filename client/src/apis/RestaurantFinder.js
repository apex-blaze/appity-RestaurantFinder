const axios = require("axios");
export default axios.create({
  baseURL: "/api/v1/restaurants",
});

// proxy is only in development, it is ignored in production
// here heroku is serving build static content as well as api
