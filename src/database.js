import mongoose from 'mongoose';

const { MONGO_URL } = process.env;

let db;

export async function initDb() {
  const url = MONGO_URL || 'localhost/cartbot';
  mongoose.connect(url, { useMongoClient: true });
  mongoose.Promise = global.Promise;

  const { PORT = 3000 } = process.env;

  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`Listening for Mongo on port ${PORT}`)
  });
}
