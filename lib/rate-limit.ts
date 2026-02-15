// Simple In-Memory Rate Limiter
// Note: This resets if the server process restarts.

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 10 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((ip) => {
    if (now > store[ip].resetTime) {
      delete store[ip];
    }
  });
}, 10 * 60 * 1000);

/**
 * Checks if an IP has exceeded the limit
 * @param ip Client IP address
 * @param limit Maximum requests allowed
 * @param windowMs Time window in milliseconds (e.g. 1 hour)
 * @returns boolean true if allowed, false if blocked
 */
export function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 60 * 60 * 1000): { allowed: boolean; remaining: number } {
  const now = Date.now();

  if (!store[ip] || now > store[ip].resetTime) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { allowed: true, remaining: limit - 1 };
  }

  if (store[ip].count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  store[ip].count++;
  return { allowed: true, remaining: limit - store[ip].count };
}
