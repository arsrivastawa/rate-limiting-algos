const express = require("express");
const FixedWindowRateLimiter = require("./fixedWindowRateLimiter");
const SlidingWindowRateLimiter = require("./slidingWindowRateLimiter");
const TokenBucketRateLimiter = require("./tokenBucketRateLimiter");
const LeakyBucketRateLimiter = require("./leakyTokenBucket");

const app = express();

const rateLimiter = new LeakyBucketRateLimiter(1, 100);

app.get("/", rateLimiter.interceptor, (req, res) => {
  res.status(200).json({
    message: "Hello World!!",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
