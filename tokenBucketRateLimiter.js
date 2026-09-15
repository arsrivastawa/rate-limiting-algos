class TokenBucketRateLimiter {
  constructor(maxTokenLimit, timePerToken) {
    this.maxTokenLimit = maxTokenLimit;
    this.timePerToken = timePerToken;
    this.tokens = maxTokenLimit;
    this.lastRefill = Date.now();
  }

  interceptor = (req, res, next) => {
    let currTime = Date.now();

    let timeLapsed = (currTime - this.lastRefill) / 1000;

    let generatedToken = Math.floor(timeLapsed / this.timePerToken);

    this.tokens = Math.min(this.maxTokenLimit, this.tokens + generatedToken);

    if (this.tokens === 0) {
      res.send(
        "Maximum request per minute reached. Interceptor has blocked your request",
      );
      return;
    }

    if (this.tokens == this.maxTokenLimit) {
      this.lastRefill = currTime;
    } else {
      this.lastRefill += generatedToken * this.timePerToken * 1000;
    }

    this.tokens--;
    next();
  };
}

module.exports = TokenBucketRateLimiter;
