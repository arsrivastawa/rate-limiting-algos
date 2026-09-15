class FixedWindowRateLimiter {
  maxRequest;
  reqCount;
  timeWindow;
  timeStart;
  timeEnd;

  constructor(maxRequest, timeWindow) {
    this.reqCount = 0;
    this.maxRequest = maxRequest;
    this.timeWindow = timeWindow;
    this.timeStart = Date.now();
    this.timeEnd = this.timeStart + this.timeWindow * 1000;
  }

  interceptor = (req, res, next) => {
    let currTime = Date.now();

    let ccg = []

    ccg.

    console.log(this.maxRequest);
    console.log(this.reqCount);
    console.log(this.timeWindow);
    console.log(this.timeStart);
    console.log(this.timeEnd);

    if (currTime - this.timeEnd > 0) {
      this.timeStart = Date.now();
      this.timeEnd = this.timeStart + this.timeWindow * 1000;
      this.reqCount = 0;
    }

    if (this.reqCount == this.maxRequest) {
      res.send(
        "Maximum request per minute reached. Interceptor has blocked your request",
      );
      return;
    }

    this.reqCount++;
    next();
  };
}

module.exports = FixedWindowRateLimiter;
