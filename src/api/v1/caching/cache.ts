import Redis from 'ioredis';

// Create a new Redis client
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  password: 'your-redis-password',
});
