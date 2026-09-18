class LeakyBucketRateLimiter {
  reqs;
  constructor(rate, capacity) {
    this.capacity = capacity;
    this.rate = rate;
    this.reqs = [];

    setInterval(this.dripper, rate * 1000);
  }

  dripper = () => {
    console.log("Dripper is running up and fine");
    if (this.reqs.length == 0) return;
    let curr = this.reqs.shift();
    curr.next();
  };

  interceptor = (req, res, next) => {
    if (this.reqs.length >= this.capacity) {
      res.status(429).json({
        message: "Interceptor has blocked your request",
      });
      return;
    }

    this.reqs.push({ req: req, res: res, next: next });
  };
}

module.exports = LeakyBucketRateLimiter;
