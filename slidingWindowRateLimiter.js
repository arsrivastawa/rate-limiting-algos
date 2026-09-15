class SlidingWindowRateLimiter {
  timestamps;
  maxRequests;
  timeWindow;

  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.timestamps = [];
  }

  interceptor = (req, res, next) => {
    let currTime = Date.now();

    while (
      this.timestamps.length > 0 &&
      currTime - this.timestamps[0] > this.timeWindow * 1000
    ) {
      this.timestamps.shift();
    }

    if (this.timestamps.length >= this.maxRequests) {
      res.send(
        "Maximum request per minute reached. Interceptor has blocked your request",
      );
      return;
    }

    this.timestamps.push(currTime);

    next();
  };
}

module.exports = SlidingWindowRateLimiter;
