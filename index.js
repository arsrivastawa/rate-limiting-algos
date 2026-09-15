const express = require("express");
const RateLimiter = require("./rateLimiter");

const app = express();

const rateLimiter = new RateLimiter(10, 60);

app.get("/", rateLimiter.interceptor, (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
