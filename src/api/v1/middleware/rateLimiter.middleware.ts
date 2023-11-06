// middleware/rateLimiter.middleware.ts

import rateLimit,{RateLimitOptions} from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

// Rate limit settings
const REQUEST_LIMIT = 5; // 5 requests per time window
const TIME_WINDOW = 60 * 1000; // 60 seconds (in milliseconds)

// Create a rate limiter middleware with custom options
const rateLimiterOptions: RateLimitOptions = {
  windowMs: TIME_WINDOW,
  max: REQUEST_LIMIT,
  message: {
    error: 'Rate limit exceeded. Try again in one minute.',
  },
};

const rateLimiterMiddleware = rateLimit(rateLimiterOptions);

export default function(req: Request, res: Response, next: NextFunction) {
  rateLimiterMiddleware(req, res, (err: any) => {
    if (err && err.message === 'Rate limit exceeded.') {
      return res.status(429).json({ error: 'Rate limit exceeded. Try again in one minute.' });
    }
    next();
  });
}
