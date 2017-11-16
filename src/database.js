import mongoose from 'mongoose';
import redis from 'redis';

const { MONGO_URL, REDIS_URL } = process.env;

let db;

export let redisClient;

export async function initDb() {
  const url = MONGO_URL || 'mongodb://localhost/cartbot';
  mongoose.connect(url, { useMongoClient: true });
  mongoose.Promise = global.Promise;

  const { PORT = 3000 } = process.env;

  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`Listening for Mongo on port ${PORT}`)
  });
}


export async function initRedis() {
  redisClient = redis.createClient(REDIS_URL);

  redisClient.on("error", err => {
    console.log("Error " + err);
  });

  redisClient.on('ready', () => {
    console.log('Redis connection established');
  });
}
