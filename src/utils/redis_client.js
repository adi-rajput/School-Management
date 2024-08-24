// redisClient.js
const Redis = require('ioredis');
const redis = new Redis({
  host: '127.0.0.1', // Ensure this matches your Redis server address
  port: 6379,        // Ensure this matches your Redis server port
});

// Handle Redis connection errors
redis.on('error', (err) => {
  console.error('Redis error:', err);
});

// Log when connected to Redis
redis.on('connect', () => {
  console.log('Connected to Redis');
});

module.exports = redis;
