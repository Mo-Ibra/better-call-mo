// Simple In-Memory Rate Limiter
// Note: This resets if the server process restarts.

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

// Preserve the store across reloads in development
const globalForRateLimit = global as unknown as {
  rateLimitStore: RateLimitStore;
};

const store = globalForRateLimit.rateLimitStore || {};
if (process.env.NODE_ENV !== "production") globalForRateLimit.rateLimitStore = store;

/**
 * Checks if an IP has exceeded the limit
 */
export function checkRateLimit(ip: string, limit: number = 5, windowMs: number = 60 * 60 * 1000): { allowed: boolean; remaining: number } {
  const now = Date.now();

  // Clean up expired entries for this IP if they exist
  if (store[ip] && now > store[ip].resetTime) {
    delete store[ip];
  }

  if (!store[ip]) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    };
    console.log(`[RateLimit] New entry for IP: ${ip}. Count: 1/${limit}`);
    return { allowed: true, remaining: limit - 1 };
  }

  if (store[ip].count >= limit) {
    console.warn(`[RateLimit] BLOCKED IP: ${ip}. Count: ${store[ip].count}/${limit}`);
    return { allowed: false, remaining: 0 };
  }

  store[ip].count++;
  console.log(`[RateLimit] Incrementing IP: ${ip}. Count: ${store[ip].count}/${limit}`);
  return { allowed: true, remaining: limit - store[ip].count };
}
