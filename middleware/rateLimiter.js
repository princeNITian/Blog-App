const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windows
    message: "Too many requests from this IP, please try again later."
});

module.exports = limiter;