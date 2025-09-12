// redisClient.js
const { createClient } = require('redis');

const redisClient = createClient({
  url: 'redis://localhost:6379' // run this line when running locally
  // Uncomment the line below when using Docker
  // url: 'redis://redis:6379' // Use Docker service name
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

module.exports = {
  redisClient,
  connectRedis
};
