const express = require("express");
const FixedWindowRateLimiter = require("./fixedWindowRateLimiter");
const SlidingWindowRateLimiter = require("./slidingWindowRateLimiter");

const app = express();

const rateLimiter = new SlidingWindowRateLimiter(5, 30);

app.get("/", rateLimiter.interceptor, (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
