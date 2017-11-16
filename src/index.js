import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { initDb } from './database';

// routes
import cartRoutes from './carts';

const app = express();

app.use(cors());
app.use(bodyParser.json());



app.use('/carts', cartRoutes);

async function start() {
  await initDb();

  app.listen(process.env.PORT || 3000, () => console.log(`Server listening on ${process.env.PORT || 3000}`));
}

start();
