const express = require("express");
const FixedWindowRateLimiter = require("./fixedWindowRateLimiter");
const SlidingWindowRateLimiter = require("./slidingWindowRateLimiter");
const TokenBucketRateLimiter = require("./tokenBucketRateLimiter");

const app = express();

const rateLimiter = new TokenBucketRateLimiter(10, 5);

app.get("/", rateLimiter.interceptor, (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
